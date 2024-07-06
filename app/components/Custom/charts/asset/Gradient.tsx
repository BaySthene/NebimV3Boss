import { ViewProps } from "react-native"
import React from "react"
import { LinearGradient, Path, Skia } from "@shopify/react-native-skia"
import { colors } from "app/theme"
import { SharedValue } from "react-native-reanimated"

interface GradientProps extends ViewProps {
  chartHeight: number;
  chartMargin: number;
  chartWidth: number;
  curvedLine: string | null;
  animationGradient: SharedValue<{ x: number, y: number }>;
}
export const Gradient:React.FC<GradientProps> = ({chartHeight, chartWidth, chartMargin, curvedLine, animationGradient, ...props}) => {
  const getGradient = (
    chartLine: string,
    width: number,
    height: number,) => {
    const gradientAreaSplit = Skia.Path.MakeFromSVGString(chartLine);
    if(gradientAreaSplit){
      gradientAreaSplit
        .lineTo(width - chartMargin, height)
        .lineTo(chartMargin,height)
        .lineTo(chartMargin, gradientAreaSplit.getPoint(0).y)
    }
    return gradientAreaSplit;
  }
  return (
    <Path path={getGradient(curvedLine!, chartWidth, chartHeight)!} >
      <LinearGradient  start={{x: 0, y:0}} end={animationGradient} colors={[colors.chartPrimaryLowOpacity, colors.chartPrimaryVeryLowOpacity]} />
    </Path>
  )
}
