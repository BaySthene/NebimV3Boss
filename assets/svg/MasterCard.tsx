
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const MasterCard = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#B1AFFF"
      d="M15.273 19.228A6.728 6.728 0 1 1 22 12.499v.001a6.735 6.735 0 0 1-6.727 6.728Z"
    />
    <Path
      fill="#5D87FF"
      d="M8.727 19.228a6.728 6.728 0 1 1 6.728-6.728 6.735 6.735 0 0 1-6.728 6.728Z"
    />
  </Svg>
)
