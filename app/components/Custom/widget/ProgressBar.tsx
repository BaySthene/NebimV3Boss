import { View, ViewStyle } from "react-native"
import Animated, { ReduceMotion, SharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import { colors, spacing } from "app/theme"
import React, { useEffect } from "react"
import { Text } from "app/components"
import { useLocales } from "expo-localization"

interface ProgressBarProps extends ViewStyle {
  max: SharedValue<number>;
  value: SharedValue<number>;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({max, value, ...props}) => {

  useEffect(() => {
    value.value = withSpring(450, {
      mass: 1,
      damping: 8,
      stiffness: 65,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const progress = value.value / max.value * 100;

    return {
      width: `${progress}%`,
    };
  });
  return (
     <>
       <View style={{
         height: 30,
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingHorizontal: spacing.xs,
       }}>
        <Text>0</Text>
        <Text preset="formLabel">Ciro Hedefi</Text>
        <Text>{max.value}</Text>

       </View>
       <View style={$progressBar} {...props}>

         <Animated.View style={[animatedStyle,{
           height: 20,
           backgroundColor: colors.chartPrimary,
           borderRadius:30,
         }]}></Animated.View>
       </View>
     </>
  )
}



const $progressBar: ViewStyle = {
  width: '100%',
  height: 20,
  backgroundColor: colors.chartPrimaryLowOpacity,
  borderRadius: 30,
  overflow: 'hidden',
}
