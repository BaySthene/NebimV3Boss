import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import { colors, spacing } from "app/theme"
import { Icon, Text } from "app/components"
import { Image, View } from "react-native"
import React from "react"

export const SearchProductDetail = ({productDetailData}) => {

  return (
    <>
      {
        productDetailData.data != null ? (
            <WidgetCard style={{
              padding: spacing.md,
            }} title="base.name" headerShown={false} >
              <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: spacing.sm }} preset="heading">{productDetailData.data.barcode}  <Icon icon="copy" size={20} onPress={() => console.log('kopyaladın')} /></Text>

              <View style={{
                flexDirection: 'row'
              }}>
                <View style={{
                  width: "50%",
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: spacing.md,
                  marginBottom: spacing.md,
                }}>
                  {/*<Icon icon="noPhoto" size={100} color={colors.background} />*/}

                  <Icon icon="noPhoto" size={100} color={colors.background} />

                  {/*<Image style={{
                 resizeMode: "cover",
                 width: "100%",
                 height: "100%",
               }} source={{uri: 'https://static.ticimax.cloud/cdn-cgi/image/width=968,quality=99,format=webp/52816/uploads/urunresimleri/buyuk/baggy-fit-kumas-pantolon-lacivert-1-68bc.jpg'}} />*/}
                </View>
                <View style={{
                  width: "50%",
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginBottom: spacing.md,
                }}>
                  <Text preset="formLabel">Perakende Satış Fiyatı </Text>
                  <Text style={{ fontSize: 25}} preset="heading">{new Intl.NumberFormat('tr-TR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                  }).format(productDetailData.data.retailSalePrice) + ' ₺'}</Text>

                </View>
              </View>
              <Text preset="formLabel">{productDetailData.data.itemDescription}</Text>
              <View style={{
                marginHorizontal: -32,
                flexDirection: 'row',
                position: 'relative',
                height:30,
                overflow: 'hidden',
              }}>
                <View style={{ width: 30, height: 30, backgroundColor: colors.background, borderRadius: 15, left: 0, position: 'absolute' }} />
                <View style={{ width: '100%', height: 1,borderWidth: 1, position: 'absolute', top: 15, borderStyle: 'dashed', borderColor: colors.background}}></View>
                <View style={{ width: 30, height: 30, backgroundColor: colors.background, borderRadius: 15, right: 0, position: 'absolute' }} />
              </View>

              <View style={{
                paddingHorizontal: spacing.md,
              }}>
                <Text><Text style={{ fontWeight: 'bold' }}>Ürün Kodu:</Text> {productDetailData.data.itemCode}</Text>
                {
                  productDetailData.data.itemDimTypeCode != 0 && (
                    <>
                      <Text><Text style={{ fontWeight: 'bold' }}>Renk:</Text>  {productDetailData.data.colorDescription}</Text>
                      <Text><Text style={{ fontWeight: 'bold' }}>Beden:</Text> {productDetailData.data.itemDim}</Text>
                    </>
                  )
                }


                <Text><Text style={{ fontWeight: 'bold' }}>Kullanılabilir Envanter:</Text> {productDetailData.data.inQty}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Alış Fiyatı:</Text> {new Intl.NumberFormat('tr-TR', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }).format(productDetailData.data.purchasePrice) + ' ₺'}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Son Alış Tedarikçisi:</Text> {productDetailData.data.lastPurchaseVendor}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Son Alış Tarihi:</Text> {trDate(productDetailData.data.lastPurchaseDate)}</Text>

              </View>

            </WidgetCard>
        ) : (
          <WidgetCard style={{
            padding: spacing.md,
          }} title="base.name" headerShown={false} >
            <View style={{ height: 40, width: '100%', backgroundColor: '#EEE' }} />

            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                width: "50%",
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: spacing.md,
                marginBottom: spacing.md,
              }}>
                {/*<Icon icon="noPhoto" size={100} color={colors.background} />*/}

                <Icon icon="noPhoto" size={100} color={colors.background} />

                {/*<Image style={{
                 resizeMode: "cover",
                 width: "100%",
                 height: "100%",
               }} source={{uri: 'https://static.ticimax.cloud/cdn-cgi/image/width=968,quality=99,format=webp/52816/uploads/urunresimleri/buyuk/baggy-fit-kumas-pantolon-lacivert-1-68bc.jpg'}} />*/}
              </View>
              <View style={{
                width: "50%",
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: spacing.md,
              }}>
                <View  style={{ height: 30, width: '100%', backgroundColor: '#EEE', marginBottom: spacing.sm }} />
                <View style={{ height: 30, width: '100%', backgroundColor: '#EEE' }} />

              </View>
            </View>
            <Text preset="subheading" style={{textAlign: 'center'}}>Kayıt Bulunamadı</Text>
            <View style={{ height: 40, width: '100%', backgroundColor: '#EEE' }} />
            <View style={{
              marginHorizontal: -32,
              flexDirection: 'row',
              position: 'relative',
              height:30,
              overflow: 'hidden',
            }}>
              <View style={{ width: 30, height: 30, backgroundColor: colors.background, borderRadius: 15, left: 0, position: 'absolute' }} />
              <View style={{ width: '100%', height: 1,borderWidth: 1, position: 'absolute', top: 15, borderStyle: 'dashed', borderColor: colors.background}}></View>
              <View style={{ width: 30, height: 30, backgroundColor: colors.background, borderRadius: 15, right: 0, position: 'absolute' }} />
            </View>

            <View style={{
              paddingHorizontal: spacing.md,
            }}>
              <View style={{ height: 20, width: '100%', backgroundColor: '#EEE', marginBottom: spacing.xs  }} />
              <View style={{ height: 20, width: '100%', backgroundColor: '#EEE', marginBottom: spacing.xs  }} />
              <View style={{ height: 20, width: '100%', backgroundColor: '#EEE', marginBottom: spacing.xs  }} />

            </View>

          </WidgetCard>
        )

      }
    </>
  )
}


const trDate = (isoDate) => {
  const date = new Date(isoDate);

// Gün, ay ve yılı Türkiye formatına göre alıyoruz
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başlar
  const year = date.getFullYear();

// Türkiye formatında tarih oluşturuyoruz
  return `${day}.${month}.${year}`;

}