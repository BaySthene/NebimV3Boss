import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ColorValue } from "react-native"

interface CashProps extends SvgProps{
  iconColor: ColorValue | undefined,
}
export const Cash: React.FC<CashProps> = ({ iconColor, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill={iconColor}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M600-320h160v-160h-60v100H600v60Zm-120-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM200-480h60v-100h100v-60H200v160ZM80-200v-560h800v560H80Zm80-80h640v-400H160v400Zm0 0v-400 400Z" />
  </Svg>
)
