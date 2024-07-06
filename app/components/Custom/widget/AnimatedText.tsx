import { colors, spacing } from "app/theme"
import React from "react"
import { SharedValue, useDerivedValue } from "react-native-reanimated"
import { Canvas, SkFont, Text } from "@shopify/react-native-skia"

interface AnimatedTextProps {
  selectedValue: SharedValue<number>;
  font: SkFont;
  selectedLabel: string,
  totalValue: number,
}
export const AnimatedText: React.FC<AnimatedTextProps> = ({selectedValue, font, selectedLabel, totalValue}) => {
  const marginVertical = 20;
  const animatedText = useDerivedValue(() => {
    return `${Math.round(selectedValue.value)}₺`;
  })
  const fontSize =  font.measureText('0');
  return (
    <Canvas style={{
      height: fontSize.height + marginVertical,
    }}>
      <Text font={font} text={animatedText} color={colors.text} y={fontSize.height + marginVertical / 2} x={spacing.xl}/>
    </Canvas>
  )
}

//<Text style={{fontSize:28,fontWeight:'bold', paddingHorizontal: spacing.xl}}>{ selectedLabel } {totalValue}₺ <GreenArrow/></Text>
