import React from "react"
import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import { View, ViewStyle } from "react-native"
import { Item } from "app/components/Custom/card/Item"

export type BestAndWorstProductDataType = {
  id: string,
  title: string,
  code: string,
  image?: string | undefined,
  salesValue: number,
  currencyCode: string,
}
interface BestAndWorstProductProps {
  data: BestAndWorstProductDataType[];
}
export const BestAndWorstProduct: React.FC<BestAndWorstProductProps> = ({ data}): React.ReactNode => {
  return (
    <WidgetCard title="widgets.bestAndWorstProduct.title" headerShown={true} >
      <View style={$bestAndWorstProductContainer}>
        {
          data.map((product, index) => (
            <Item key={product.id} backgroundColor={index === 1 ? "255,105,105" :  "180,227, 128" } borderRadius={index === 1 ? 10 : 0} product={product} />
          ))
        }
      </View>
    </WidgetCard>
  )
}

const $bestAndWorstProductContainer: ViewStyle = {
  height: 'auto',
}
