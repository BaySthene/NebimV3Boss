import { View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { GreenArrow } from "assets/svg/GreenArrow"
import { WelcomeBg } from "assets/svg/WelcomeBg"
import React from "react"
import { colors } from "app/theme"

export const WelcomeBanner = () => {
  return (
    <View style={$bannerCard}>
      <View style={$welcomeBannerCard}>
        <View style={{justifyContent: 'flex-start'}}>
          <Text style={{marginBottom:20}} preset="subheading">Hoşgeldin Muhammet Keskin!</Text>
          <View style={$welcomeBannerCardStatisticView}>
            <View style={$welcomeBannerCardStatisticDataView}>
              <Text preset="heading">123.000₺<GreenArrow /></Text>
              <Text preset="formHelper">Bugünkü Satışlar</Text>
            </View>
            <View style={$welcomeBannerCardStatisticDataView}>
              <Text preset="heading">1262<GreenArrow /></Text>
              <Text preset="formHelper">Bugünkü Satış Adeti</Text>
            </View>
          </View>

        </View>
        <WelcomeBg width="100%" height={200} style={{marginTop:-60}}  />
      </View>
    </View>
  )
}

const $bannerCard: ViewStyle = {
  width: '100%',
  height: 'auto',
  backgroundColor: colors.bannerBackground,
  marginVertical: 16,
  borderRadius:10,
  shadowColor: 'rgb(38, 43, 67)',
  shadowOffset: { width: 4, height: 14 },
  shadowRadius: 3.84,
  shadowOpacity: 0.8,
  elevation: 2,
  paddingHorizontal: 16,
  paddingTop: 32,
}
const $welcomeBannerCard: ViewStyle = {
  flexDirection: 'column',
  flexWrap: 'wrap',
  height: 'auto',
  width: '100%',
  justifyContent: 'space-between',
}

const $welcomeBannerCardStatisticView: ViewStyle = {
  flexWrap: 'wrap',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  justifyContent: 'space-between',
}

const $welcomeBannerCardStatisticDataView: ViewStyle = {
  alignSelf: 'flex-end',
  alignItems: 'center',
}
