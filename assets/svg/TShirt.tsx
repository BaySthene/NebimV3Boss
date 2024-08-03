import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { ColorValue } from "react-native"

interface TShirtProps extends SvgProps{
  iconColor: ColorValue | undefined,
}
export const TShirt: React.FC<TShirtProps> = ({iconColor, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={iconColor}
    viewBox="0 -960 960 960"
    {...props}
  >
    <Path d="M165-480 45-688l264-152h51q16 48 38 84t82 36q60 0 82-36t38-84h51l263 153-119 207-75-41v192l-63 55q-3 2-8 5t-9 5v-393l125 69 40-70-153-89q-24 49-70.5 78T480-640q-55 0-101.5-29T308-747l-154 89 41 70 125-69v237q-21 2-41 6.5T240-401v-120l-75 41Zm21 295-52-61 87-74q23-20 52.5-30.5T335-361q32 0 61 10.5t52 30.5l116 99q12 10 28.5 15.5T626-200q18 0 33.5-5t27.5-16l87-75 52 62-87 74q-23 20-52 30t-61 10q-32 0-61.5-10T512-160l-116-99q-12-10-27.5-15.5T335-280q-17 0-33.5 5.5T273-259l-87 74Zm294-455Z" />
  </Svg>
)