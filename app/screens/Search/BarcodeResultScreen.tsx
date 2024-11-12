import { AppStackScreenProps, DashboardScreenProps } from "app/navigators"
import React, { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"

import {
  Image, Pressable, ScrollView,
  View,
  ViewStyle,
} from "react-native"
import { Button, Icon, ListView, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { widgetController } from "app/services/api/widget/widgetController"
import { SearchProductDetail } from "app/components/Custom/widget/SearchProductDetail"

interface BarcodeResultScreenProps extends AppStackScreenProps<"BarcodeResult"> {}


export const BarcodeResultScreen: FC<BarcodeResultScreenProps> = observer(function DashboardScreen(_props) {
  const { navigation, route } = _props
  const {
    authenticationStore: { authTaxId, authToken },
  } = useStores()
  const [productDetailData, setProductDetailData] = useState({});
  const [productDetailDataLoading, setProductDetailDataLoading] = useState(false);


  const { barcode } = route.params;
  useEffect(() => {
    setProductDetailDataLoading(false);
    async function getSearchProductDetailsData(accessToken, taxId, barcode) : Promise<any> {
      await widgetController.getSearchProductDetailsData(accessToken, taxId, barcode).then((res) => {
        setProductDetailData(res.data)
        setProductDetailDataLoading(true);
      })
    }

    getSearchProductDetailsData(authToken, authTaxId, barcode);
  }, [])

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
    >
      <Pressable onPress={() => navigation.navigate('ProductSearchScreen')} style={{
        backgroundColor: colors.error,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingLeft: 3,
        borderRadius: 10,
        position: "absolute",
        bottom: 40,
        right: 40,
        zIndex: 1,
        height: 50,
        width: 50,
      }} >
        <Text><Icon icon="close" size={20} color={colors.background} /> </Text>
      </Pressable>
      <Pressable onPress={() => navigation.goBack()} style={{
        backgroundColor: colors.chartPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        paddingLeft: 3,
        borderRadius: 10,
        position: "absolute",
        bottom: 40,
        right: 100,
        zIndex: 1,
        height: 50,
        width: 50,
      }} >
        <Text><Icon icon="scanner" size={20} color={colors.background} /> </Text>
      </Pressable>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >

       <View style={{ flexDirection: 'row', alignItems: "center", height: 60}}>

         <Text preset="subheading" style={{ marginTop: spacing.md }}>  Ürün Sorgula</Text>
       </View>
        {
          productDetailDataLoading ? (
            <SearchProductDetail productDetailData={productDetailData} />

          ) : (
            <Text preset="heading">Yükleniyor</Text>
          )
        }

        { /* Envanter Kapsayıcı View'i Başlangıcı */}
        <View style={{
          marginBottom: spacing.xl,
        }}>

          <Text preset="subheading" style={{ marginTop: spacing.md }}>Envanter</Text>

          { /* Envanter Başlık Kısmı Başlangıcı */ }
          <View style={{
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            backgroundColor: colors.cardBackground,
            marginTop: spacing.md,
            marginBottom: spacing.xxs,
            borderRadius: spacing.md,
            flexDirection: 'row',
          }}>
            <Text preset="bold" style={{ textAlign: 'center', width: '25%', borderRightWidth: 1, borderColor: colors.background }}>Renk</Text>
            <Text preset="bold" style={{ textAlign: 'center', width: '75%' }}>Envanter</Text>

          </View>
          { /* Envanter Başlık Kısmı Bitişi */ }

          { /* Envanter Renk Gösterimi Kapsayıcı View'i Başlangıcı */ }
          <View style={{
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            backgroundColor: colors.cardBackground,
            borderRadius: spacing.md,
            borderColor: colors.background, borderBottomWidth: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: spacing.xxs,
          }}>
            { /* Envanter Renk Gösterimi Row'u Başlangıcı */ }
            <Text preset="formLabel" style={{ textAlign: 'center', width: '25%', borderRightWidth: 1, borderColor: colors.background }}>Kardinal Kırmızısı</Text>
            <View style={{ width: '75%', alignItems: 'center', justifyContent: 'center' }}>
              <Text preset="formLabel" style={{ textAlign: 'center' }}>15</Text>
            </View>
            { /* Envanter Renk Gösterimi Row'u Bitişi */ }

            { /* Envanter Depo Gösterimi Row'u Başlangıcı */ }
            <View style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: spacing.sm,
              borderTopWidth: 1,
              borderColor: colors.background,
            }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '25%', borderRightWidth: 1, borderColor: colors.background }} />
                <View style={{ flexDirection: 'row', width: '75%', flexWrap: 'wrap' }}>
                  <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: colors.background,
                    alignItems: 'center',
                    paddingVertical: spacing.xxs
                  }}>
                    <Text preset="formLabel" style={{ textAlign: 'center', width: '33%', borderRightWidth: 1, borderColor: colors.background  }}>Derince Depo</Text>
                    <Text preset="formLabel" style={{ textAlign: 'center', width: '33%', borderRightWidth: 1, borderColor: colors.background }}>Echol Fashion Satış Alanı</Text>
                    <Text preset="formLabel" style={{ textAlign: 'center', width: '33%' }}>Merkez Dağıtım Deposu</Text>
                  </View>

                </View>
              </View>

            </View>
            { /* Envanter Depo Gösterimi Row'u Bitişi */ }


            { /* Envanter Varyant Bazlı Envanter Gösterimi Depolar Yan Yana Başlangıcı */ }
            <View style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
              <View style={{ flexDirection: 'row',}}>
                <View style={{ width: '25%', height: 'auto', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: colors.background, borderTopWidth: 1 }}>
                  <Text preset="formLabel" style={{ textAlign: 'center',  }}>XS</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '75%', flexWrap: 'wrap' }}>
                  <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderColor: colors.background,
                    alignItems: 'center',
                    paddingVertical: spacing.xxs
                  }}>
                    <Text preset="formLabel" style={{ textAlign: 'center', width: '33%', borderRightWidth: 1, borderColor: colors.background  }}>3</Text>
                    <Text preset="formLabel" style={{ textAlign: 'center', width: '33%', borderRightWidth: 1, borderColor: colors.background }}>12</Text>
                    <Text preset="formLabel" style={{ textAlign: 'center', width: '33%' }}>0</Text>
                  </View>
                </View>
              </View>

            </View>
            { /* Envanter Varyant Bazlı Envanter Gösterimi Depolar Yan Yana Bitişi */ }




          </View>
          { /* Envanter Renk Gösterimi Kapsayıcı View'i Bitişi */ }

        </View>
        { /* Envanter Kapsayıcı View'i Bitişi */}








      </ScrollView>

    </Screen>
  )


});


const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg
}