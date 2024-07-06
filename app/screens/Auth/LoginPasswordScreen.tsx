import { AppStackScreenProps } from "app/navigators"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { $presets, Icon, TextField, TextFieldAccessoryProps } from "app/components"
import { Pressable, TextInput, TextStyle, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { BlurView } from "expo-blur"
import { useStores } from "app/models"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"

interface LoginPasswordScreenProps extends AppStackScreenProps<"LoginPassword"> {}

export const LoginPasswordScreen: FC<LoginPasswordScreenProps> = observer(function LoginPasswordScreen(_props) {
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>(null)
  const $drawerInsets = useSafeAreaInsetsStyle(["top","bottom"])

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { setAuthEmail, setAuthToken, setIsAuthenticated, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
    setIsAuthenticated(true);
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
  return (
      <Pressable style={{flex: 1}} onPress={() => {
        navigation.goBack();
      }}>
        <BlurView style={[$screenContentContainer, { paddingTop: $drawerInsets.paddingTop, paddingBottom: $drawerInsets.paddingBottom }]} intensity={120} tint="light">

            <Animated.View entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} >
              <Animated.Image entering={FadeInLeft.duration(400).delay(500)} exiting={FadeOutLeft.duration(400).delay(500)} sharedTransitionTag="sharedTag" style={{width:120,height: 120, marginVertical: spacing.md}} borderRadius={60} source={{uri: 'https://metropoldigital.com/wp-content/uploads/2022/12/Avatar_TWoW_Neytiri_Textless_Poster-819x1024.webp'}} resizeMode="cover" />
              <Animated.Text sharedTransitionTag="fullName" testID="login-heading" style={$presets.heading} >Muhammet Keskin</Animated.Text>
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
                onSubmitEditing={login}
                RightAccessory={PasswordRightAccessory}
                inputWrapperStyle={{ alignItems: 'center'}}
                autoFocus
              />
            </Animated.View>

        </BlurView>
      </Pressable>
  )
});


const $screenContentContainer: ViewStyle = {
  paddingHorizontal: spacing.xl,
  justifyContent: "center",
  flex: 1,
}

const $textField: TextStyle = {
  marginVertical: spacing.md,
  fontSize: 15
}

const $textFieldContainer: TextStyle = {
  marginBottom: spacing.md,
}

