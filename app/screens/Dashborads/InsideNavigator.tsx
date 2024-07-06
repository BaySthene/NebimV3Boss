import { AppStackScreenProps } from "app/navigators"
import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen, Text } from "app/components"
import { Header } from "app/components/Custom/Header"
import { Dimensions, Image, ImageStyle, ScrollView, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue, withSpring, withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { Drawer } from "react-native-drawer-layout"
import { isRTL } from "app/i18n"

import { LogBox } from 'react-native';
import { WelcomeBanner } from "app/components/Custom/widget/WelcomeBanner"
import { useStores } from "app/models"
import { SalesOverviewList } from "app/components/Custom/widget/SalesOverviewList"


interface InsideNavigatorScreenProps extends AppStackScreenProps<"InsideNavigator"> {}
export const InsideNavigatorScreen: FC<InsideNavigatorScreenProps> = observer(function InsideNavigatorScreen(_props) {

  const data = [
    [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }],
    [{ label: '1', value: 112 }, { label: '2', value: 322 }, { label: '3', value: 231 }, { label: '4', value: 8329 }, { label: '5', value: 1234 }, { label: '6', value: 100 }, { label: '7', value: 10000 }]
  ];


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {
    authenticationStore: { logout },
  } = useStores()
  const scrollY = useSharedValue(0);
  const marginHorizontal = useSharedValue(0);
  const backgroundColor = useSharedValue('transparent');
  const headerElevation = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
    if (scrollY.value > 0) {
      marginHorizontal.value = withTiming(16, { duration: 350, easing: Easing.inOut(Easing.ease) });
      backgroundColor.value = colors.cardBackground;
      headerElevation.value = 5;
    } else {
      marginHorizontal.value = withTiming(0, { duration: 200, easing: Easing.inOut(Easing.ease) }, () => {
        backgroundColor.value =  withSpring(colors.background)
        headerElevation.value = 0;
      });
    }
  });
  const headerStyle = useAnimatedStyle(() => {
    return {
      marginHorizontal: marginHorizontal.value,
      backgroundColor: backgroundColor.value,
      elevation: headerElevation.value,
    };
  });
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])
  const $drawerInsets = useSafeAreaInsetsStyle(["top","bottom"])
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      drawerStyle={{
        width: Dimensions.get('window').width / 1.25,
      }}
      renderDrawerContent={() => (
        <View style={[$drawer, {paddingTop: $drawerInsets.paddingTop,paddingBottom: $drawerInsets.paddingBottom}]}>
          <View style={$drawerHeaderView}>
            <Text preset="subheading" text="Nebim V3 Patron" />
          </View>
          <ScrollView contentContainerStyle={$scrollView}>

          </ScrollView>
          <View style={$drawerFooterView}>
            <View style={$drawerRecognitionCard}>
              <Image style={{width:45,height: 45, marginHorizontal: spacing.xs}} borderRadius={60} source={{uri: 'https://metropoldigital.com/wp-content/uploads/2022/12/Avatar_TWoW_Neytiri_Textless_Poster-819x1024.webp'}} resizeMode="cover" />
              <View>
                <Text preset="subheading" text="Muhammet" />
                <Text preset="formLabel" text="Yönetici" />
              </View>
              <Icon style={$headerIcon} icon="exit" onPress={logout} />
            </View>
          </View>
        </View>
      )}
    >
      <Screen
        preset="scroll"
        safeAreaEdges={["top","bottom"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Header headerStyle={headerStyle} toggleDrawerHandle={toggleDrawer} />
        <Animated.ScrollView
          contentContainerStyle={$scrollView}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <WelcomeBanner />
          <SalesOverviewList data={data} />

        </Animated.ScrollView>

      </Screen>
    </Drawer>
  )
});

const $screenContentContainer: ViewStyle = {
  flex: 1
}
const $scrollView: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal:16,

}
const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}
const $drawerHeaderView: ViewStyle = {
  height: 'auto',
  alignItems: 'center',
  paddingVertical: spacing.md,
}
const $drawerFooterView: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  height: 'auto',
  width: '100%',
  padding: spacing.xl,
}
const $drawerRecognitionCard: ViewStyle = {
  backgroundColor: "rgb(232, 247, 255)",
  borderRadius: 8,
  padding: 20,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
}

const $headerIcon: ImageStyle = {
  marginHorizontal: 10,
  height: 24,
  width: 24,
}

