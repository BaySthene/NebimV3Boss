import { AppStackScreenProps } from "app/navigators"
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Screen, Text } from "app/components"
import { ImageBackground, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "app/theme"
import LottieView from "lottie-react-native"
import { BlurView } from "expo-blur"
import { changeLanguage } from "app/i18n"


interface VerifyRegisterScreenProps extends AppStackScreenProps<"VerifyRegister"> {}

export const VerifyRegisterScreen: FC<VerifyRegisterScreenProps> = observer(function VerifyRegisterScreen(_props) {
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
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
        <ImageBackground style={$imageBackgroundContainer} width={1000} source={{uri: 'https://nebim.istanbul/assets/media/auth/bg10.jpeg'}} resizeMode="cover">
          <View style={{ alignItems: 'flex-end', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl, paddingRight: -spacing.xl}}>
            <Pressable onPress={() => changeLanguageHandle()}>
              <Text tx='loginScreen.language' />
            </Pressable>
          </View>
          <BlurView intensity={80}  style={$blurViewContainer}>

              <Text testID="login-heading" preset="heading" text="Yetkilendirme" />
              <Text testID="login-heading" preset="bold" text="Size ve şirket yöneticinize bir e-posta gönderdik. Bir sonra ki adıma geçebilmek için; kimliğinizi doğrulayıp yetkilendirilmelisiniz." style={$verifyLabel} />
              <View style={$verifyBrandLabel}>
                <Text testID="login-heading" preset="bold" tx="base.name"  />
              </View>
          </BlurView>
        </ImageBackground>

    </Screen>
  )
});

const $screenContentContainer: ViewStyle = {
  flex: 1,
  overflow: 'scroll'
}
const $imageBackgroundContainer: ViewStyle = {
  paddingHorizontal: spacing.xl,
  flex: 1,
}

const $blurViewContainer: ViewStyle = {
  flex: 1,
  padding: spacing.sm,
  borderRadius: 50,
  marginBottom: spacing.xxxl,
  overflow: "scroll",
  height: 10000

}
const $lottieStyle: ViewStyle = {
  width: '100%',
  height: '50%',
  marginBottom: spacing.xxxs
}
const $verifyLabel: TextStyle = {
  marginTop: spacing.md,
  textAlign: 'center',
}

const $verifyBrandLabel: TextStyle = {
  bottom: 25,
  right: 25,
  position: 'absolute'
}
