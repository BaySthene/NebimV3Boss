import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import React from "react"
import { Dimensions } from "react-native"
import { GivenPayments } from "app/components/Custom/widget/GivenPayments"

interface GivenPaymentsListProps {
  data:any,
  scrollX: SharedValue<number>;
}
export const GivenPaymentsList: React.FC<GivenPaymentsListProps> = ({data, scrollX}) => {

  return data.map((data, index) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.8, 1, 0.8]
      );
      return {
        transform: [{ scale }],
      };
    });
    return (
      <Animated.View key={index} style={[$crswid, animatedStyle]}>
        <GivenPayments data={data} />
      </Animated.View>
    );
  })
}


const { width } = Dimensions.get('window');
const $crswid = {
  width: width - 32,
}
