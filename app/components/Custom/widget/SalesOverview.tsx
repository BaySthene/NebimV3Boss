import React, { useState } from "react"
import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import { LineChart } from "app/components/Custom/charts/LineChart"
import { View, ViewStyle } from "react-native"
import { AnimatedText } from "app/components/Custom/widget/AnimatedText"
import { useFont } from "@shopify/react-native-skia"
import { useSharedValue } from "react-native-reanimated"

export type LineChartData = {
  label: string,
  value: number,
}
interface SalesOverviewProps {
  chartData: LineChartData[],
  totalValue: number,
}
export const SalesOverview: React.FC<SalesOverviewProps> = ({chartData, totalValue}) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState('Total');
  const selectedValue = useSharedValue(0);
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };
  const font = useFont(require('../../../../assets/font/Roboto-Regular.ttf'),28);
  if(!font){
    return null;
  }
  return (
    <WidgetCard title="widgets.salesOverView.title" subTitle="widgets.daily" headerShown={true} >
      <View style={$lineChartView} onLayout={onLayout}>
        <AnimatedText font={font} selectedValue={selectedValue} selectedLabel={selectedLabel} totalValue={totalValue} />
        <LineChart  data={chartData} chartHeight={100} chartMargin={10} chartWidth={parentWidth} xAxisLabel={true} setSelectedLabel={setSelectedLabel} selectedValue={selectedValue} />
      </View>
    </WidgetCard>
  )
}

const $lineChartView: ViewStyle = {
  height: 'auto',
  width: '100%',
}


