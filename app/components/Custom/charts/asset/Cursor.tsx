import { Circle, Group, Path, Skia } from "@shopify/react-native-skia"
import { colors } from "app/theme"
import { SharedValue, useDerivedValue } from "react-native-reanimated"
import React from "react"

interface CursorProps {
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  chartHeight: number,
}
export const Cursor: React.FC<CursorProps> = ({cx, cy, chartHeight}) => {
  const path = useDerivedValue(() => {
    const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - cy.value);
    dottedLine.dash(10,10,0);
    const matrix = Skia.Matrix();
    matrix.translate(cx.value, cy.value);
    dottedLine.transform(matrix);
    return dottedLine
  })

  return (
    <Group>
      <Path path={path} color={colors.chartPrimary} style={'stroke'} strokeWidth={2} strokeCap={'round'} />
      <Circle cx={cx} cy={cy} r={10} style={'stroke'} strokeWidth={5} color={colors.chartPrimary}/>
    </Group>
  )
}
