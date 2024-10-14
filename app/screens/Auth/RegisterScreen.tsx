import { AppStackScreenProps } from "app/navigators"
import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, Screen, TextField, Button } from "app/components"
import { Pressable, ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import { changeLanguage } from "app/i18n"
import { useStores } from "app/models"
import { authController } from "app/services/api/auth/authController"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { setAuthEmail,setAuthTaxId, setAuthToken,authEmail,authTaxId, setGrantType, validationError, isRecorded, setUserId},
  } = useStores()
  const authVKNInput = useRef<TextInput>(null)
  const authEmailInput = useRef<TextInput>(null)
  const [ authEmailS, setAuthEmailS ] = useState(isRecorded ? authEmail : '');
  const [ authVKNError, setAuthVKNError ] = useState('');
  const [ authEmailError, setAuthEmailError ] = useState('');
  const [ authVKN, setAuthVKN ] = useState(isRecorded ? authTaxId : '');
  const  [ language, setLanguage ] = useState('tr');
  // callbacks
  const changeLanguageHandle = async () => {
    if(language === 'tr'){
      await changeLanguage('en')
      setLanguage('en')
    }else{
      await changeLanguage('tr')
      setLanguage('tr')
    }
  }
  const registerHandle = async () => {

    await authController.IsHaveAccount(authVKN, authEmailS).then((res: any) => {
      if(res.exists) {
        setUserId(res.userId)
        setGrantType('password')
        setAuthToken(res.accessToken)
        setAuthEmail(authEmailS)
        setAuthTaxId(authVKN)
      }else {
        if(res.error){
          setAuthVKNError(res.error);
        }
       // navigation.navigate("RegisterParams")
      }
    })
  }
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top"]}
    >

      <ScrollView style={$imageBackgroundContainer}>
          <View style={{ alignItems: 'flex-end', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, paddingRight: -spacing.xl}}>
            <Pressable onPress={() => changeLanguageHandle()}>
              <Text tx='loginScreen.language' />
            </Pressable>
          </View>
          <Animated.View entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} >
            <Text testID="login-heading" preset="heading" tx="base.name" style={$brandHeadingText} />
            <TextField
              style={$textField}
              ref={authVKNInput}
              value={authVKN}
              onChangeText={setAuthVKN}
              containerStyle={$textFieldContainer}
              autoCapitalize="none"
              autoCorrect
              labelTx="loginScreen.vknFieldLabel"
              placeholderTx="loginScreen.vknFieldPlaceholder"
              onSubmitEditing={() => authEmailInput.current && authEmailInput.current.focus()}
              inputWrapperStyle={{ alignItems: 'center'}}
              autoFocus
              helper={authVKNError}
              HelperTextProps={{style: { color: colors.error, fontSize: 13 }}}
              keyboardType="number-pad"
            />
            <TextField
              style={$textField}
              ref={authEmailInput}
              value={authEmailS}
              onChangeText={setAuthEmailS}
              containerStyle={$textFieldContainer}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              onSubmitEditing={() => registerHandle}
              inputWrapperStyle={{ alignItems: 'center'}}
              keyboardType="email-address"
              helper={authEmailError}
              HelperTextProps={{style: { color: colors.error, fontSize: 13 }}}
            />
            <Button style={{ marginVertical: spacing.md }} preset="reversed" tx="loginScreen.tapToSignInOrSignUp" onPress={registerHandle} />

          </Animated.View>

      </ScrollView>
    </Screen>
  )
});



const $screenContentContainer: ViewStyle = {
  flex: 1
}
const $imageBackgroundContainer: ViewStyle = {
  paddingHorizontal: spacing.xl,

  flex: 1,
}
const $brandHeadingText: TextStyle = {
  paddingVertical: spacing.xxl,
  fontSize: 50
}

const $textField: TextStyle = {
  marginVertical: spacing.md,
  fontSize: 15
}

const $textFieldContainer: TextStyle = {
  marginBottom: spacing.md,
}
