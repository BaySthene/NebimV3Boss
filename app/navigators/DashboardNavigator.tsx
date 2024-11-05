import React, { useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Screens from 'app/screens';
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { useStores } from "app/models"
import Animated, {
  Easing,
  ScrollHandlerProcessed,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue, withSpring, withTiming,
} from "react-native-reanimated"
import { colors, spacing } from "app/theme"
import { Drawer } from "react-native-drawer-layout"
import { isRTL } from "app/i18n"
import { Dimensions, Image, ImageStyle, ScrollView, View, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "app/components"
import { Header } from "app/components/Custom/Header"

export type DashboardNavigatorParamList = {
  InsideNavigator: undefined,
  Dashboard: undefined,
  ProductSearch: undefined,
  Expense: undefined,
}
export type DashboardScreenProps<T extends keyof DashboardNavigatorParamList> = BottomTabScreenProps<
  DashboardNavigatorParamList,
  T
>
const Tab = createBottomTabNavigator<DashboardNavigatorParamList>()
export const DashboardNavigator = () => {
  //Auth Statements
  const {
    authenticationStore: { authAvatar, authFullName, expiresIn, authToken, authTaxId, logout },
  } = useStores()

  //Header Statements
  const scrollY = useSharedValue(0);
  const scrollXSalesOverview = useSharedValue(0);
  const scrollXGivenPayments = useSharedValue(0);
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

//Drawer statements
  const [open, setOpen] = useState(false)
  const $drawerInsets = useSafeAreaInsetsStyle(["top","bottom"])
  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

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
            <Text preset="subheading" tx="base.name" />
          </View>
          <ScrollView contentContainerStyle={$scrollView}>

          </ScrollView>
          <View style={$drawerFooterView}>
            <View style={$drawerRecognitionCard}>
              <Image style={{width:45,height: 45 ,marginRight: 10}} borderRadius={60} source={{uri: authAvatar}} resizeMode="cover" />
              <View>
                <Text preset="formLabel" text={authFullName} />
                <Text preset="formHelper" text="Yönetici" />
              </View>
              <View>
                <Icon style={$headerIcon} icon="exit" onPress={logout} />

              </View>
            </View>
          </View>
        </View>
      )}
    >
      <Screen
        preset="scroll"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <Header headerStyle={headerStyle} toggleDrawerHandle={toggleDrawer} avatar={authAvatar} />
        <Tab.Navigator initialRouteName="Dashboard"  screenOptions={{ headerShown: false, tabBarLabelPosition: 'beside-icon' , tabBarItemStyle:{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }, tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: colors.bannerBackground,
            padding: 0,
            marginHorizontal: spacing.sm,
            marginBottom: spacing.lg,
            height: 70,
            borderRadius: 25,
          } }}>
          <Tab.Screen name="Dashboard" component={Screens.DashboardScreen} options={{
            tabBarLabel: 'Ana Sayfa',
            tabBarIcon: ({ color, size }) => (
              <Icon icon="home" color={color} size={size} />
            )
          }} />
          <Tab.Screen name="ProductSearch" component={Screens.DashboardScreen} options={{
            tabBarLabel: 'Ürün Sorgula',
            tabBarIcon: ({ color, size }) => (
              <Icon icon="search" color={color} size={size} />
            )
          }} />
          <Tab.Screen name="Expense" component={Screens.DashboardScreen} options={{
            tabBarLabel: 'Masraf',
            tabBarIcon: ({ color, size }) => (
              <Icon icon="recipt" color={color} size={size} />
            )
          }} />
        </Tab.Navigator>
      </Screen>
    </Drawer>

  )
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
  paddingHorizontal: 10,
  paddingVertical: 20,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
}
const $scrollView: ViewStyle = {
  paddingHorizontal:16,
}
const $headerIcon: ImageStyle = {
  marginHorizontal: 10,
  height: 20,
  width: 20,
}
const $screenContentContainer: ViewStyle = {
  flex: 1
}