import "@expo/metro-runtime"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import App from "./app/app"
import { LocaleConfig } from "react-native-calendars"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  LocaleConfig.locales['tr'] = {
    monthNames: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık'
    ],
    monthNamesShort: ['Ock.', 'Şbt', 'Mrt', 'Nsn.', 'May.', 'Haz.', 'Tem.', 'Ags.', 'Eyl.', 'Ekm.', 'Ksm.', 'Arlk.'],
    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    dayNamesShort: ['Pz.', 'Pzt.', 'Sal.', 'Çar.', 'Per.', 'Cum.', 'Cmt.'],
    today: "Bugün"
  };
  LocaleConfig.defaultLocale = 'tr';
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
