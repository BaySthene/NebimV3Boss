import React from "react"
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated"
import { Dimensions, View, ViewStyle } from "react-native"
import { colors } from "app/theme"

interface CarouselCardProps {
  children: React.ReactNode;
  data: any;
  scrollX: SharedValue<number>;

}
export const CarouselCard: React.FC<CarouselCardProps> = ({children, data, scrollX}) => {


  const scrollHandlerHor = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  return (
    <>
      <View style={$indicatorContainer}>
        {data.map((_: any, i: number) => {
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
        {children}
      </Animated.ScrollView>
    </>
  )
}


const { width } = Dimensions.get('window');
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
