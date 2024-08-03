import Animated, {
  interpolateColor, SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"
import React from "react"
import { colors, spacing } from "app/theme"
import { ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import { Countdown } from "app/components/Custom/widget/Countdown"

interface DemoCountdownProps {
  animatedValue: SharedValue<number>;
}
export const DemoCountdown:React.FC<DemoCountdownProps> = ({animatedValue}) => {
  // Animasyonlu stil
  const animatedStyle = useAnimatedStyle(() => {
    const color1 = `${colors.background}`;
    const color2 = `rgba(255, 77, 73, 0.49)`;


    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 1],
      [color1, color2]
    );
    return {
      backgroundColor,
    };
  });
  const d = '2024-7-19 23:59:59'
  return (
    <Animated.View style={[demoCountdownStyle, animatedStyle]}>
      <Text preset="subheading" tx="demoCountDown.title" />
      <Countdown preset="heading" initialDate={d}/>
      <Button preset="reversed" tx="demoCountDown.paymentsButton" />
    </Animated.View>
  )
}

const demoCountdownStyle: ViewStyle = {
  width: '100%',
  height: 'auto',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.md,
};
