import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useRef, useState } from "react"
import { ImageBackground, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { $presets, Button, Icon, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { changeLanguage } from "app/i18n"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const  [ language, setLanguage ] = useState('tr');
  const changeLanguageHandle = async () => {
    if(language === 'tr'){
      await changeLanguage('en')
      setLanguage('en')
    }else{
      await changeLanguage('tr')
      setLanguage('tr')
    }
  }

  const handlePress = () => {
    navigation.navigate("LoginPassword")
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={{ alignItems: 'flex-end', paddingVertical: spacing.md, paddingHorizontal: spacing.lg}}>
        <Pressable onPress={() => changeLanguageHandle()}>
          <Text tx='loginScreen.language' />
        </Pressable>
      </View>
      <ImageBackground style={$imageBackgroundContainer} width={1000} source={{uri: 'https://nebim.istanbul/assets/media/auth/bg10.jpeg'}} resizeMode="cover">
        <Animated.View entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} >
          <Text testID="login-heading" preset="heading" text="Nebim V3 Portal" style={$brandHeadingText} />

          <Animated.Image entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} sharedTransitionTag="sharedTag" style={{width:120,height: 120, marginVertical: spacing.md}} borderRadius={60} source={{uri: 'https://metropoldigital.com/wp-content/uploads/2022/12/Avatar_TWoW_Neytiri_Textless_Poster-819x1024.webp'}} resizeMode="cover" />

          <Text testID="login-heading" preset="subheading" tx="loginScreen.welcomeText"  style={$welcomeText}/>
          <Animated.Text sharedTransitionTag="fullName" testID="login-heading" style={$presets.heading} >Muhammet Keskin</Animated.Text>
          <Button style={{ marginVertical: spacing.md }} preset="reversed" tx="loginScreen.tapToSignIn" onPress={handlePress} />
          <Text testID="login-heading" preset="formHelper" tx="loginScreen.changeAccount"  />
        </Animated.View>
      </ImageBackground>
    </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1
}
const $imageBackgroundContainer: ViewStyle = {
  paddingHorizontal: spacing.xl,
  paddingTop: spacing.xxxl,
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

