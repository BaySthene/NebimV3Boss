import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const Turkey = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    imageRendering="optimizeQuality"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    viewBox="0 0 512 356.18"
    {...props}
  >
    <G fillRule="nonzero">
      <Path
        fill="#E30A17"
        d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z"
      />
      <Path
        fill="#fff"
        d="M253.365 130.516c-15.783-24.923-43.598-41.473-75.281-41.473-49.179 0-89.047 39.868-89.047 89.047 0 49.179 39.868 89.047 89.047 89.047 31.684 0 59.498-16.55 75.282-41.475-13.042 14.526-31.963 23.665-53.021 23.665-39.342 0-71.237-31.893-71.237-71.237 0-39.344 31.895-71.237 71.237-71.237 21.058 0 39.978 9.138 53.02 23.663zm-4.785 47.574 80.543 26.169-49.778-68.514v84.688l49.778-68.514-80.543 26.171z"
      />
    </G>
  </Svg>
)
export default Turkey
