import { AppStackScreenProps } from "app/navigators"
import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Icon, Screen, Text } from "app/components"
import { Header } from "app/components/Custom/Header"
import { Dimensions, Image, ImageStyle, ScrollView, View, ViewStyle , LogBox } from "react-native"
import { colors, spacing } from "app/theme"
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue, withRepeat, withSequence, withSpring, withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { Drawer } from "react-native-drawer-layout"
import { isRTL } from "app/i18n"
import { WelcomeBanner } from "app/components/Custom/widget/WelcomeBanner"
import { useStores } from "app/models"
import { SalesOverviewList } from "app/components/Custom/widget/SalesOverviewList"
import { YearlyStatistics } from "app/components/Custom/widget/YearlyStatistics"
import { DemoCountdown } from "app/components/Custom/widget/DemoCountdown"
import { CarouselCard } from "app/components/Custom/card/CarouselCard"
import { GivenPaymentsList } from "app/components/Custom/widget/GivenPaymentsList"
import { BestAndWorstProduct, BestAndWorstProductDataType } from "app/components/Custom/widget/BestAndWorstProduct"
import { AgendaDataType, FinancialCalendar } from "app/components/Custom/widget/FinancialCalendar"
import { authController } from "app/services/api/auth/authController"
import { widgetController } from "app/services/api/widget/widgetController"
interface InsideNavigatorScreenProps extends AppStackScreenProps<"InsideNavigator"> {}
export const InsideNavigatorScreen: FC<InsideNavigatorScreenProps> = observer(function InsideNavigatorScreen(_props) {
  const {
    authenticationStore: { authAvatar, authFullName, expiresIn, authToken, authTaxId },
  } = useStores()
  const data = [
    [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }, { label: '4', value: 4 }],
    [{ label: 'pzt', value: 112 }, { label: 'sl', value: 322 }, { label: 'crs', value: 231 }, { label: 'prs', value: 8329 }, { label: 'cm', value: 1234 }, { label: 'cmt', value: 100 }, { label: 'pz', value: 10000 }],
    [{ label: 'Ock', value: 112 }, { label: 'Sbt', value: 322 }, { label: 'Mrt', value: 231 }, { label: 'Nsn', value: 8329 }, { label: 'May', value: 1234 }, { label: 'Haz', value: 100 }, { label: 'Tem', value: 10000 },  { label: 'Ağs', value: 231 }, { label: 'Eyl', value: 8329 }, { label: 'Ekm', value: 1234 }, { label: 'Kas', value: 100 }, { label: 'Arl', value: 10000 }],
    [{ label: '1', value: 112 }, { label: '2', value: 322 }, { label: '3', value: 231 }, { label: '4', value: 8329 }, { label: '5', value: 1234 }, { label: '6', value: 100 }, { label: '7', value: 10000 }]
  ];
  const productData: BestAndWorstProductDataType[] = [
    {
      id: '123891askjd12',
      title: 'Nike DX2319 Kadın Sweatshirt',
      code: 'DX2319',
      currencyCode: 'TRY',
      image: 'https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-white-t-shirt-mockup-realistic-t-shirt-png-image_9906363.png',
      salesValue: 1230000012,
    },
    {
      id: '123891askjd',
      title: 'Nike DX2319 Kadın Sweatshirt WORST',
      code: 'DX2319',
      currencyCode: 'TRY',
      salesValue: 123,
    }
  ]

  const agendaDatas: AgendaDataType[] = [
    {
      id: 'asdasd',
      date: '2024-07-30',
      currAccDescription: 'Muhammet Keskin',
      currAccType: 'retailCustomer',
      documentCode: 'invoi',
      value: 1500,
    },
    {
      id: 'sdflw',
      date: '2024-07-30',
      currAccDescription: 'Muhammet Keskin',
      currAccType: 'retailCustomer',
      documentCode: 'invoi',
      value: 9200,
    }
  ]


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const {
    authenticationStore: { logout },
  } = useStores()
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
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const animatedValue = useSharedValue(0);

  useEffect(() => {

    animatedValue.value = withRepeat(
      withSequence(
        withSpring(1, { damping: 4, stiffness: 30 }),
        withSpring(0, { damping: 4, stiffness: 15 })
      ),
      -1,
      true
    );
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
        <Animated.ScrollView
          nestedScrollEnabled={true}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: 60,
          }}
        >
          {/*<DemoCountdown animatedValue={animatedValue} />*/}
          <View style={$scrollView}>
            <WelcomeBanner fullName={authFullName}/>
            <CarouselCard data={data} scrollX={scrollXSalesOverview}>
              <SalesOverviewList data={data} scrollX={scrollXSalesOverview} />
            </CarouselCard>
            {/* <YearlyStatistics />
            <CarouselCard data={data} scrollX={scrollXGivenPayments}>
              <GivenPaymentsList data={data} scrollX={scrollXGivenPayments} />
            </CarouselCard>
            <CarouselCard data={data} scrollX={scrollXGivenPayments}>
              <GivenPaymentsList data={data} scrollX={scrollXGivenPayments} />
            </CarouselCard>
            <FinancialCalendar agendaData={agendaDatas} />
            <BestAndWorstProduct data={productData} />*/}
          </View>


        </Animated.ScrollView>

      </Screen>
    </Drawer>
  )
});

const $screenContentContainer: ViewStyle = {
  flex: 1
}
const $scrollView: ViewStyle = {
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
  paddingHorizontal: 10,
  paddingVertical: 20,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
}

const $headerIcon: ImageStyle = {
  marginHorizontal: 10,
  height: 20,
  width: 20,
}

