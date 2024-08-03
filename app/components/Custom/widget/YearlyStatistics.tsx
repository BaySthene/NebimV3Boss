import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "app/components"
import { Cash } from "assets/svg/Cash"
import { colors } from "app/theme"
import { useSharedValue } from "react-native-reanimated"
import { ProgressBar } from "app/components/Custom/widget/ProgressBar"
import { List } from "app/components/Custom/card/List"
import { GreenArrow } from "assets/svg/GreenArrow"
export const YearlyStatistics = () => {
  const gero = useSharedValue<number>(0);
  const targetGero = useSharedValue(500);

  return (
    <WidgetCard title="widgets.yearlyGero.title"  headerShown={true} >
      <View style={$widgetCardHeader}>
        <View style={$moneyIcon}>
          <Cash iconColor={colors.chartPrimary} width={35} height={35}/>
        </View>
        <View>
          <Text preset="subheading" style={{
            fontSize: 28
          }}>89,522₺</Text>
         <Text preset="formHelper">Son 1 yılda elde edilen kar</Text>
        </View>
      </View>
      <View style={$widgetBody}>
       <ProgressBar max={targetGero} value={gero} />
      </View>
      <List
        leftComponentType="dot"
        rightComponent={<Text preset="formLabel" >89.522₺<GreenArrow/></Text>}
        label="Ciro"
      />
      <List
        leftComponentType="dot"
        rightComponent={<Text preset="formLabel" >1890</Text>}
        label="Satış Adeti"
      />
      <List
        leftComponentType="dot"
        rightComponent={<Text preset="formLabel" >12.295₺<GreenArrow/></Text>}
        label="İade"
      />


    </WidgetCard>
  )
}



const $widgetCardHeader: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  paddingHorizontal: 16,
  flexWrap: 'wrap',
};

const $moneyIcon: ViewStyle = {
  backgroundColor: 'rgb(236, 242, 255)',
  borderRadius: 7,
  height: 60,
  width: 60,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
};

const $widgetBody: ViewStyle = {
  padding: 16,
}
