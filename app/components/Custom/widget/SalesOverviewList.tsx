import { Dimensions } from "react-native"
import Animated, {
  interpolate, SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated"
import { SalesOverview } from "app/components/Custom/widget/SalesOverview"
import React from "react"
interface SalesOverviewListProps {
  data:any,
  scrollX: SharedValue<number>;
}
export const SalesOverviewList: React.FC<SalesOverviewListProps> = ({data, scrollX}) => {



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
          <SalesOverview chartData={data} totalValue={0} />
        </Animated.View>
      );
    })
}


const { width } = Dimensions.get('window');
const $crswid = {
  width: width - 32,
}
