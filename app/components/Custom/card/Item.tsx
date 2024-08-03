import { colors, spacing } from "app/theme"
import { Image, View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { TShirt } from "assets/svg/TShirt"
import React, { useEffect } from "react"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { BestAndWorstProductDataType } from "app/components/Custom/widget/BestAndWorstProduct"

export interface ItemProps{
  backgroundColor: string;
  borderRadius?: number;
  product: BestAndWorstProductDataType;
}
export const Item: React.FC<ItemProps> = ({ backgroundColor, borderRadius = 0, product}): React.ReactNode => {

  const opacity = useSharedValue(0.3);

  // opacity değerini 0 ile 1 arasında sürekli değiştir
  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: 1000 }), // 500 ms sürede opaklığı 0'a düşür
      -1, // sonsuz tekrar
      true // tersine çevir (0 -> 1, 1 -> 0 şeklinde)
    );
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(${backgroundColor}, ${opacity.value})`, // Kırmızı renk ve animasyonlu opaklık
    };
  });

  return (
    <Animated.View style={[$itemContainer, animatedStyle, { borderBottomRightRadius: borderRadius, borderBottomLeftRadius: borderRadius }]}>
      <View style={$productContainer}>
        <View style={$productLabel}>
          <Text preset="formHelper" text="Ürün" />
        </View>
        <View style={$product}>
          {
            typeof product.image == 'undefined' ? (
              <TShirt width={80} height={80} iconColor={colors.chartPrimary} />
            ) : (
              <Image width={80} height={80} source={{uri: product.image}} />
            )
          }

          <View style={$productDescription}>
            <View style={{ maxWidth: 100 }}>
              <Text preset="formLabel" text={product.title} />
              <Text preset="formHelper" text={product.code} />
            </View>
          </View>
        </View>
      </View>
      <View style={$productContainer}>
        <View style={$productLabel}>
          <Text preset="formHelper" text="Satış" />
        </View>
        <View style={$saleCell}>
          <Text preset="bold" text={new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: product.currencyCode,
            currencyDisplay: 'narrowSymbol',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(product.salesValue)} />
        </View>
      </View>
    </Animated.View>
  )
}

const $itemContainer: ViewStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.xl,

}

const $productContainer: ViewStyle = {
  flexDirection: 'column'
}

const $productLabel: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
}

const $product: ViewStyle = {
  flexDirection: 'row',
}

const $productDescription: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: spacing.md,
  flexWrap: 'wrap',
  flexGrow: 1,
}

const $saleCell: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 80,
};
