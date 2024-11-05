import { AppStackScreenProps, DashboardScreenProps } from "app/navigators"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import Animated, {
  Easing,
  ScrollHandlerProcessed,
  useAnimatedScrollHandler, useAnimatedStyle, useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { View, ViewStyle } from "react-native"
import { Screen } from "app/components"
import { Header } from "app/components/Custom/Header"
import { WelcomeBanner } from "app/components/Custom/widget/WelcomeBanner"
import { CarouselCard } from "app/components/Custom/card/CarouselCard"
import { SalesOverviewList } from "app/components/Custom/widget/SalesOverviewList"
import { colors } from "app/theme"
import { useStores } from "app/models"

interface DashboardScreenSProps extends DashboardScreenProps<"Dashboard"> {}

export const DashboardScreen: FC<DashboardScreenSProps> = observer(function DashboardScreen(_props) {
//Auth Statements
  const {
    authenticationStore: { authAvatar, authFullName, expiresIn, authToken, authTaxId, logout },
  } = useStores()


// export const DashboardScreen: FC<any> = ({ handleEvent }) => {
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
    >
      <Animated.ScrollView
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        contentContainerStyle={{
        }}
      >
        {/*<DemoCountdown animatedValue={animatedValue} />*/}
        <View style={$scrollView}>
          <WelcomeBanner fullName={authFullName}/>

          {/*
            <CarouselCard data={data} scrollX={scrollXSalesOverview}>
            <SalesOverviewList data={data} scrollX={scrollXSalesOverview} />
          </CarouselCard>
           <YearlyStatistics />
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
  )
});

const $scrollView: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal:16,
}
const $screenContentContainer: ViewStyle = {
  flex: 1
}