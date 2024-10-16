import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../models"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { DashboardParamList } from "app/screens"
import { authController } from "app/services/api/auth/authController"

export type LoginPasswordScreenParams = {
  LoginPassword: {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  }

}
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  LoginPassword: {
    avatar: string,
    fullName: string
  },
  Register: undefined,
  VerifyRegister: undefined,
  RegisterParams: undefined,
  Dashboard: DashboardParamList
  InsideNavigator: undefined,
}
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated, isRegistered, expiresIn, setExpireIn, setUserId, setGrantType, setAuthToken, setRefreshToken, refreshToken, setIsAuthenticated },
  } = useStores()

  const changeAccount = async () => {
    setUserId(undefined)
    setGrantType('client_credentials')
    setAuthToken(undefined)
    setRefreshToken(undefined)
    setExpireIn(undefined)
  }

  useEffect(() =>  {
    const getNewToken = async (refreshToken: string) => {
      await authController.getRefreshToken(refreshToken).then((res) => {
         if(typeof res !== null) {
           setRefreshToken(res.refresh_token)
           setAuthToken(res.access_token)
           setExpireIn(new Date(Date.now() + res.expires_in * 1000).toString())
         }else {
           setIsAuthenticated(false)
         }
      })
    }
    if(typeof expiresIn !== undefined) {
      if(expiresIn != "Invalid Date") {
        if(Date.now() > new Date(expiresIn).getTime()) {
          getNewToken(refreshToken)
        }else {
          setIsAuthenticated(false)
        }
      }else {
        changeAccount();
        setIsAuthenticated(false)
      }
      // @ts-ignore

    }else {
      changeAccount();
      setIsAuthenticated(false)
    }
  }, [])

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
                <Stack.Screen name="LoginPassword" component={Screens.LoginPasswordScreen}
                options={{ headerShown: false, presentation: "transparentModal", animation: "fade" }} />
              </>
            )
          }
        </>
      ) : (
        // Eğer ki kayıtlı bir giriş bulunamadıysa ilk giriş ekranına yönlenidirelecek
        <>
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="LoginPassword" component={Screens.LoginPasswordScreen} options={{ headerShown: false, presentation: 'transparentModal', animation: 'fade' }} />
          <Stack.Screen name="VerifyRegister" component={Screens.VerifyRegisterScreen} options={{ headerShown: false, animation: 'fade' }} />
          <Stack.Screen name="RegisterParams" component={Screens.RegisterParamsScreen} options={{ headerShown: false, animation: 'fade' }} />

        </>
      )}

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
