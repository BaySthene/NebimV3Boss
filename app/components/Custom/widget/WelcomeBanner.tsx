import { View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { WelcomeBg } from "assets/svg/WelcomeBg"
import React, { useEffect, useState } from "react"
import { colors } from "app/theme"
import { widgetController } from "app/services/api/widget/widgetController"
import { useStores } from "app/models"

// @ts-ignore
export const WelcomeBanner = ({fullName}) => {
  const {
    authenticationStore: { authToken, authTaxId },
  } = useStores();
  const [sales, setSales] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [welcomeWidgetLoading, setWelcomeWidgetLoading] = useState(false);
  const [welcomeWidgetError, setWelcomeWidgetError] = useState('');

  useEffect(() => {
    setWelcomeWidgetLoading(false)
    async function getWelcomeBannerData(authToken: string | undefined, authTaxId: string) {
      await widgetController.getWelcomeBannerData(authToken, authTaxId).then((res) =>{
        if(res.data == null) {
          setWelcomeWidgetError("Widget verisi çekilirken bir hata ile karşılaşıldı sunucuya erişim olmayabilir");
        }else {
          if(res.data.error != null) {
            setWelcomeWidgetError(res.data.error);
          }else{
            setSales(res.data.data.sales);
            setSalesCount(res.data.data.salesCount);
            setWelcomeWidgetLoading(true);
          }
        }
      })
    }
    getWelcomeBannerData(authToken,authTaxId) ;
  }, [])


  return (
   <>
     {
       welcomeWidgetLoading ? (
         <View style={$bannerCard}>
           <View style={$welcomeBannerCard}>
             <View style={{justifyContent: 'flex-start'}}>
               <View style={{ flexDirection: 'row' }}>
                 <Text style={{marginBottom:20}} preset="formLabel" tx="banners.welcome.welcome"></Text>
                 <Text style={{marginBottom:20}} preset="formLabel"> { fullName }</Text>
               </View>
               <View style={$welcomeBannerCardStatisticView}>
                 <View style={$welcomeBannerCardStatisticDataView}>
                   <Text preset="subheading">{new Intl.NumberFormat('tr-TR', {
                     minimumFractionDigits: 2,
                     maximumFractionDigits: 2
                   }).format(sales) + ' ₺'}</Text>
                   <Text preset="formHelper" tx="banners.welcome.salesToday" />
                 </View>
                 <View style={$welcomeBannerCardStatisticDataView}>
                   <Text preset="subheading">{salesCount}</Text>
                   <Text preset="formHelper" tx="banners.welcome.salesCount" />
                 </View>
               </View>

             </View>
           </View>
         </View>
       ) : (
         <View style={$bannerCard}>
           <View style={$welcomeBannerCard}>
             <View style={{justifyContent: 'flex-start'}}>
               <Text >{welcomeWidgetError != '' ? welcomeWidgetError : 'Yükleniyor...'}</Text>
             </View>
             <WelcomeBg width="100%" height={200} style={{ marginTop: -60 }} />
           </View>
         </View>
       )
     }
   </>
  )
}

const $bannerCard: ViewStyle = {
  width: '100%',
  height: 'auto',
  backgroundColor: colors.bannerBackground,
  marginVertical: 16,
  borderRadius:10,
  shadowColor: 'rgb(38, 43, 67)',
  paddingHorizontal: 16,
  paddingTop: 32,
  paddingBottom: 32,
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
