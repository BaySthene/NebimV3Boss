import { AppStackScreenProps } from "app/navigators"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import Animated, { ScrollHandlerProcessed } from "react-native-reanimated"
import { View, ViewStyle } from "react-native"

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> {}

export type DashboardParamList = {
  handleEvent: ScrollHandlerProcessed<Record<string, unknown>>;
}
export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen(_props) {
//export const DashboardScreen: FC<any> = ({ handleEvent }) => {
  const { route } = _props
   const { handleEvent } = route.params;
  return (
    <Animated.ScrollView
      contentContainerStyle={$scrollView}
      onScroll={() =>handleEvent}
      scrollEventThrottle={16}
    >
      <View style={$scrollContent} />
    </Animated.ScrollView>
  )
});

const $scrollView: ViewStyle = {
  flexGrow: 1,
}
const $scrollContent: ViewStyle = {
  height: 1000,
  width: '100%',
}
