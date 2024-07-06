import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const GreenArrow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={24}
    fill="none"
    stroke="#39B69A"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="tabler-icon tabler-icon-arrow-up-right"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M17 7 7 17M8 7h9v9" />
  </Svg>
)
