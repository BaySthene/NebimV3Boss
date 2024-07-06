/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { DashboardParamList } from "app/screens"



/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type LoginPasswordScreenParams = {
  LoginPassword: {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  }

}
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  LoginPassword: undefined,
  Register: undefined,
  VerifyRegister: undefined,
  RegisterParams: undefined,
  Dashboard: DashboardParamList
  InsideNavigator: undefined,
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated, isRegistered },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "Dashboard" : "Login"}
    >
      {isRegistered ? (
        <>
          {
            isAuthenticated ? (
              // Dashboard'a yönlendirilecek
              <>
                <Stack.Screen name="InsideNavigator" component={Screens.InsideNavigatorScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Screens.LoginScreen} />
                <Stack.Screen name="LoginPassword" component={Screens.LoginPasswordScreen} options={{ headerShown: false, presentation: 'transparentModal', animation: 'fade' }} />
              </>
            )
          }
        </>
      ) : (
        //Eğer ki kayıtlı bir giriş bulunamadıysa ilk giriş ekranına yönlenidirelecek
        <>
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="LoginPassword" component={Screens.LoginPasswordScreen} options={{ headerShown: false, presentation: 'transparentModal', animation: 'fade' }} />
          <Stack.Screen name="VerifyRegister" component={Screens.VerifyRegisterScreen} options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="RegisterParams" component={Screens.RegisterParamsScreen} options={{ headerShown: false, animation: 'fade' }} />

        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
