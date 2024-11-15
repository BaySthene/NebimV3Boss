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
import { SearchProductInventory } from "app/components/Custom/widget/SearchProductInventory"

interface BarcodeResultScreenProps extends AppStackScreenProps<"BarcodeResult"> {}


export const BarcodeResultScreen: FC<BarcodeResultScreenProps> = observer(function DashboardScreen(_props) {
  const { navigation, route } = _props
  const {
    authenticationStore: { authTaxId, authToken },
  } = useStores()
  const [productDetailData, setProductDetailData] = useState({});
  const [productDetailDataLoading, setProductDetailDataLoading] = useState(false);
  const [productInventoryData, setProductInventoryData] = useState({});
  const [productInventoryDataLoading, setProductInventoryDataLoading] = useState(false);


  const { barcode } = route.params;
  useEffect(() => {
    setProductDetailDataLoading(false);
    setProductInventoryDataLoading(false)
    async function getSearchProductDetailsData(accessToken, taxId, barcode) : Promise<any> {
      await widgetController.getSearchProductDetailsData(accessToken, taxId, barcode).then((res) => {
        setProductDetailData(res.data)
        setProductDetailDataLoading(true);
      })

      await widgetController.getSearchProductInventoryData(accessToken, taxId, barcode).then((res) => {
        setProductInventoryData(res.data)
        setProductInventoryDataLoading(true)
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

        {
          productInventoryDataLoading ? (
            <SearchProductInventory productInventoryData={productInventoryData} />
          ) : (
           <></>
          )
        }










      </ScrollView>

    </Screen>
  )


});


const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.lg
}