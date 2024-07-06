import { Canvas, Skia, Path } from "@shopify/react-native-skia"
import { colors} from "app/theme"
import { ViewProps } from "react-native"
import { curveBasis, line, scaleLinear, scalePoint } from "d3"
import { LineChartData } from "app/components/Custom/widget/SalesOverview"
import React, { useEffect, useState } from "react"
import { clamp, runOnJS, SharedValue, useSharedValue, withDelay, withTiming } from "react-native-reanimated"
import { Gradient } from "app/components/Custom/charts/asset/Gradient"
import { XAxisText } from "./asset/XAxisText"
import { Cursor } from "app/components/Custom/charts/asset/Cursor"
import { Gesture, GestureDetector, PanGestureHandlerEventPayload } from "react-native-gesture-handler"
import { getYForX, parse } from "react-native-redash"




interface LineChartProps extends ViewProps{
  data:LineChartData[];
  chartHeight: number;
  chartMargin: number;
  chartWidth:  number;
  xAxisLabel: boolean;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: SharedValue<number>;
}
export const LineChart:React.FC<LineChartProps> = ({data, chartHeight, chartMargin, chartWidth, xAxisLabel, setSelectedLabel, selectedValue, ...viewProps}) => {
  const [showCursor, setShowCursor] = useState(false);
  const animationGradient = useSharedValue({x: 0, y: 0});
  const animationLine = useSharedValue(0);
  const cx = useSharedValue(0);
  const cy = useSharedValue(0);
  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  useEffect(() => {
    animationLine.value = withTiming(1,{duration: 1000});
    animationGradient.value = withDelay(1000, withTiming({x: 0, y: chartHeight}, {duration: 500}))
    selectedValue.value = withTiming(totalValue);
  }, [])

  const xDomain = data.map((dataPoint:any) => dataPoint.label);
  const xRange = [chartMargin, chartWidth - chartMargin];
  const x = scalePoint().domain(xDomain).range(xRange).padding(0)
  const stepX = x.step();
  const max = Math.max(...data.map(val => val.value));
  const min = Math.min(...data.map(val => val.value));
  const yDomain = [min, max];
  const yRange = [chartHeight, 0];
  const y = scaleLinear().domain(yDomain).range(yRange);
  const curvedLine = line<LineChartData>()
    .x(d => x(d.label)!)
    .y(d => y(d.value))
    .curve(curveBasis)(data);
  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);
  const path =  parse(linePath!.toSVGString())
  const gestureHandleEvent = (e: PanGestureHandlerEventPayload) => {
    'worklet'
    const index = Math.floor(e.absoluteX / stepX);
    runOnJS(setSelectedLabel)(data[index].label)
    selectedValue.value = withTiming(data[index].value);
    const clampValue = clamp(Math.floor(e.absoluteX / stepX) * stepX + chartMargin, chartMargin, chartWidth - chartMargin)
    cx.value= clampValue
    cy.value = getYForX(path, Math.floor(clampValue))!
  }
  const pan = Gesture.Pan()
    .onTouchesDown(() => runOnJS(setShowCursor)(true))
    .onTouchesUp(() => {
      runOnJS(setShowCursor)(false)
      runOnJS(setSelectedLabel)("Total")
      selectedValue.value = withTiming(totalValue);
    })
    .onBegin(gestureHandleEvent)
    .onChange(gestureHandleEvent)

  return (
      <GestureDetector gesture={pan}>
        <Canvas style={[{
          width: chartWidth,
          height: chartHeight + 35,
        }]}>
          <Path path={linePath!} style={'stroke'} strokeWidth={4} strokeCap={'round'} color={colors.chartPrimary} start={0} end={animationLine}/>
          <Gradient chartHeight={chartHeight} chartMargin={chartMargin} chartWidth={chartWidth} curvedLine={curvedLine} animationGradient={animationGradient} />
          {
            xAxisLabel &&
            data.map((dataPoint: LineChartData, index) => (
              <XAxisText
                x={x(dataPoint.label)!}
                y={chartHeight}
                text={dataPoint.label}
                key={index}
              />
            ))
          }
          { showCursor &&  ( <Cursor cx={cx} cy={cy} chartHeight={chartHeight} /> )}

        </Canvas>
      </GestureDetector>
  )
}

