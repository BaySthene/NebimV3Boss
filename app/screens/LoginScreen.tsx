import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { $presets, Button, Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
import Animated from "react-native-reanimated"
import { changeLanguage } from "app/i18n"
import { authController } from "app/services/api/auth/authController"
import { useStores } from "app/models"
import { useUserPreInfo } from "app/Hooks/useUserPreInfo"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const  [ language, setLanguage ] = useState('tr');
  const {
    authenticationStore: { refreshToken, authToken, expiresIn, authTaxId, authEmail, userId , setAuthEmail,setAuthTaxId, setAuthToken, setGrantType, setUserId},
  } = useStores()
  const {userPreInfo, userPreInfoLoading, userPreInfoError} = useUserPreInfo(authToken, userId);

  const changeLanguageHandle = async () => {
    if(language === 'tr'){
      await changeLanguage('en')
      setLanguage('en')
    }else{
      await changeLanguage('tr')
      setLanguage('tr')
    }
  }

  const changeAccount = async () => {
    setUserId(undefined)
    setGrantType('client_credentials')
    setAuthToken(undefined)
    setAuthEmail('')
    setAuthTaxId('')
  }


  const handlePress = async () => {
    navigation.navigate("LoginPassword", {
      avatar: userPreInfo.avatar,
      fullName: userPreInfo.fullName,
    })

  };

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top"]}
    >
      <ScrollView style={$imageBackgroundContainer}>

        <View style={{ alignItems: 'flex-end', paddingVertical: spacing.md, paddingHorizontal: spacing.lg}}>
          <Pressable onPress={() => changeLanguageHandle()}>
            <Text tx='loginScreen.language' />
          </Pressable>
        </View>
        <Animated.View>
          <Text testID="login-heading" preset="heading" tx="base.name" style={$brandHeadingText} />



          {
            !userPreInfoLoading && (
              <>
                <Animated.Image style={{ width: 120, height: 120, marginVertical: spacing.md }} borderRadius={60}
                                source={{ uri: userPreInfo.avatar }}
                                resizeMode="cover" />

                <Text testID="login-heading" preset="subheading" tx="loginScreen.welcomeText" style={$welcomeText} />
                <Animated.Text testID="login-heading" style={$presets.heading}>{userPreInfo.fullName} </Animated.Text>
              </>
            )
          }

          <Button style={{ marginVertical: spacing.md }} preset="reversed" tx="loginScreen.tapToSignIn"
                  onPress={handlePress} />
          <Text testID="login-heading" preset="formHelper" tx="loginScreen.changeAccount" onPress={changeAccount}/>
        </Animated.View>
      </ScrollView>

    </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
}
const $imageBackgroundContainer: ViewStyle = {
  paddingHorizontal: spacing.xl,
  flex: 1,
}
const $brandHeadingText: TextStyle = {
  paddingVertical: spacing.xxl,
  fontSize: 50
}
const $welcomeText: TextStyle = {
  fontSize: 18
}
const $bottomSheetBackgroundStyle: StyleProp<Omit<ViewStyle,  "bottom" | "left" | "position" | "right" | "top">> = {
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
}
const $bottomSheetStyle: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.xxl,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

