import { AppStackScreenProps } from "app/navigators"
import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { ImageBackground, Pressable, ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import { changeLanguage } from "app/i18n"
import { useStores } from "app/models"
import { authController } from "app/services/api/auth/authController"
interface RegisterParamsProps extends AppStackScreenProps<"RegisterParams"> {}

export const RegisterParamsScreen: FC<RegisterParamsProps> = observer(function RegisterParamsScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { validationError, isRecorded, register, authEmail, authTaxId, authToken, setIsAuthenticated ,setRefreshToken, setExpireIn, setAuthToken },
  } = useStores()
  const authFirstNameInput = useRef<TextInput>(null)
  const authLastNameInput = useRef<TextInput>(null)
  const authPasswordInput = useRef<TextInput>(null)
  const  [ language, setLanguage ] = useState('tr');
  const [ authFirstName, setAuthFirstName ] = useState(isRecorded ? register.firstName : '');
  const [ authLastName, setAuthLastName ] = useState(isRecorded ? register.lastName : '');
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const changeLanguageHandle = async () => {
    if(language === 'tr'){
      await changeLanguage('en')
      setLanguage('en')
    }else{
      await changeLanguage('tr')
      setLanguage('tr')
    }
  }
  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const registerHandle = async () => {
    authController.PostRegister(authToken, authFirstName, authLastName, authPassword, authEmail, authTaxId).then((res) => {
      console.log(res)
      setRefreshToken(res.refresh_token)
      setAuthToken(res.access_token)
      setExpireIn('expires_in', new Date(Date.now() + res.expires_in * 1000).toString())
      setIsAuthenticated(true)
    })
  }
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top"]}
    >
     <ScrollView style={$imageBackgroundContainer}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Icon size={spacing.lg} style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, paddingRight: -spacing.xl}} icon="back" onPress={() => navigation.goBack()} />
            <View style={{ alignItems: 'flex-end', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, paddingRight: -spacing.xl}}>

              <Pressable onPress={() => changeLanguageHandle()}>
                <Text tx='loginScreen.language' />
              </Pressable>
            </View>
          </View>

         <Animated.View entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} >
           <Text testID="login-heading" preset="heading" tx="base.name" style={$brandHeadingText} />
           <TextField
             style={$textField}
             ref={authFirstNameInput}
             value={authFirstName}
             onChangeText={setAuthFirstName}
             containerStyle={$textFieldContainer}
             autoCapitalize="none"
             autoCorrect
             labelTx="loginScreen.firstNameLabel"
             placeholderTx="loginScreen.firstNamePlaceholder"
             onSubmitEditing={() => authFirstNameInput.current && authLastNameInput.current.focus()}
             inputWrapperStyle={{ alignItems: 'center'}}
             autoFocus
             keyboardType="default"
           />
           <TextField
             style={$textField}
             ref={authLastNameInput}
             value={authLastName}
             onChangeText={setAuthLastName}
             containerStyle={$textFieldContainer}
             autoCapitalize="none"
             autoCorrect
             labelTx="loginScreen.lastNameLabel"
             placeholderTx="loginScreen.lastNamePlaceholder"
             onSubmitEditing={() => authLastNameInput.current && authPasswordInput.current.focus()}
             inputWrapperStyle={{ alignItems: 'center'}}
             autoFocus
             keyboardType="default"
           />
           <TextField
             style={$textField}
             ref={authPasswordInput}
             value={authPassword}
             onChangeText={setAuthPassword}
             containerStyle={$textFieldContainer}
             autoCapitalize="none"
             autoComplete="password"
             autoCorrect={false}
             secureTextEntry={isAuthPasswordHidden}
             labelTx="loginScreen.passwordFieldLabel"
             placeholderTx="loginScreen.passwordFieldPlaceholder"
             RightAccessory={PasswordRightAccessory}
             inputWrapperStyle={{ alignItems: 'center'}}
             autoFocus
             keyboardType="visible-password"
           />
           <Button style={{ marginVertical: spacing.md }} preset="reversed" tx="loginScreen.tapToSignIn" onPress={registerHandle}  />

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
