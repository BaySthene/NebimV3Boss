import { AppStackScreenProps } from "app/navigators"
import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, Screen, TextField, Button } from "app/components"
import { ImageBackground, Pressable, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import { changeLanguage } from "app/i18n"
import { useStores } from "app/models"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const authVKNInput = useRef<TextInput>(null)
  const authEmailInput = useRef<TextInput>(null)
  const [ authEmailS, setAuthEmailS ] = useState('');
  const [ authVKN, setAuthVKN ] = useState('');
  const  [ language, setLanguage ] = useState('tr');
  const {
    authenticationStore: { setAuthEmail, setAuthToken, setIsAuthenticated, validationError },
  } = useStores()
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
  const registerHandle = () => {
    setAuthToken(String(Date.now()))
    setIsAuthenticated(true);
  }
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >

      <ImageBackground style={$imageBackgroundContainer} width={1000} source={{uri: 'https://nebim.istanbul/assets/media/auth/bg10.jpeg'}} resizeMode="cover">
        <View style={{ alignItems: 'flex-end', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, paddingRight: -spacing.xl}}>
          <Pressable onPress={() => changeLanguageHandle()}>
            <Text tx='loginScreen.language' />
          </Pressable>
        </View>
        <Animated.View entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} >
          <Text testID="login-heading" preset="heading" text="Nebim V3 Portal" style={$brandHeadingText} />
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
            onSubmitEditing={() => console.log('gönderdin')}
            inputWrapperStyle={{ alignItems: 'center'}}
          />
          <Button style={{ marginVertical: spacing.md }} preset="reversed" tx="loginScreen.tapToSignInOrSignUp" onPress={registerHandle} />

        </Animated.View>

      </ImageBackground>
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
