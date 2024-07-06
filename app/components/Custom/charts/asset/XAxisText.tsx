import React from "react"
import { Text, useFont } from "@shopify/react-native-skia"
import { colors } from "app/theme"

interface XAxisTextProps{
  x: number
  y: number
  text: string,
}
export const XAxisText:React.FC<XAxisTextProps> = ({x, y, text}) => {
  const font = useFont(require('../../../../../assets/font/Roboto-Regular.ttf'));
  if(!font){
    return null;
  }
  const fontSize = font.measureText(text);
  return (
    <Text font={font} text={text} x={x - fontSize.width / 2} y={y + fontSize.height * 2} color={colors.chartPrimaryLowOpacity} />
  )
}
