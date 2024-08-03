import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ColorValue } from "react-native"

interface BankProps extends SvgProps{
  iconColor: ColorValue | undefined,
}
export const Bank: React.FC<BankProps> = ({iconColor, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill={iconColor}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
  </Svg>
)