import { Dimensions, View, ViewStyle } from "react-native"
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"
import { LineChartData, SalesOverview } from "app/components/Custom/widget/SalesOverview"
import React from "react"
import { colors } from "app/theme"
interface SalesOverviewListProps {
  data:any
}
export const SalesOverviewList: React.FC<SalesOverviewListProps> = ({data}) => {

  const scrollX = useSharedValue(0);

  const scrollHandlerHor = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <>
      <View style={$indicatorContainer}>
        {data.map((_, i) => {
          const animatedStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              scrollX.value,
              [(i - 1) * width, i * width, (i + 1) * width],
              [0.5, 1, 0.5]
            );
            return { opacity };
          });

          return <Animated.View key={i} style={[$dot, animatedStyle]} />;
        })}
      </View>
      <Animated.ScrollView horizontal
                           pagingEnabled
                           showsHorizontalScrollIndicator={false}
                           onScroll={scrollHandlerHor}
                           scrollEventThrottle={16}
                           style={{flexDirection: 'row'}}
      >
        {data.map((data, index) => {
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
        })}
      </Animated.ScrollView>
    </>
  )
}


const { width } = Dimensions.get('window');
const $crswid = {
  width: width - 32,
}
const $indicatorContainer: ViewStyle = {
  flexDirection: 'row',
  right: 0,
  width: '100%',
  justifyContent: 'flex-end',
  marginTop: 16,

};
const $dot: ViewStyle = {
  height: 10,
  width: 10,
  borderRadius: 5,
  backgroundColor: colors.chartPrimary,
  marginHorizontal: 8,
};
