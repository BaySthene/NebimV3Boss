import { WidgetCard } from "app/components/Custom/card/WidgetCard"
import { ListItem, Text } from "app/components"
import { View, ViewStyle } from "react-native"
import { CreditCard } from "assets/svg/CreditCard"
import { colors } from "app/theme"
import { GreenArrow } from "assets/svg/GreenArrow"
import { Cash } from "assets/svg/Cash"
import { Bank } from "assets/svg/Bank"
import React from "react"

interface GivenPaymentsProps {
  data: any;
}

export const GivenPayments: React.FC<GivenPaymentsProps> = ({ data }) => {
  return (
    <WidgetCard title="widgets.transactions.title" subTitle="widgets.daily" headerShown={true} >
      <ListItem
        bottomSeparator
        LeftComponent={
          <View style={$listItemLeftComponent}>
            <View style={$listItemLeftIcon}>
              <CreditCard iconColor={colors.chartPrimary}/>
            </View>
          </View>
        }
        RightComponent={
          <View style={$listItemLeftComponent}>
            <View style={$listItemRightComponent}>
              <Text preset="formLabel" >54.000₺<GreenArrow/></Text>
            </View>
          </View>
        }
      >
        <Text preset="formLabel">Kredi Kartı</Text>
      </ListItem>
      <ListItem
        bottomSeparator
        LeftComponent={
          <View style={$listItemLeftComponent}>
            <View style={$listItemLeftIcon}>
              <Cash iconColor={colors.chartPrimary}/>
            </View>
          </View>
        }
        RightComponent={
          <View style={$listItemLeftComponent}>
            <View style={$listItemRightComponent}>
              <Text preset="formLabel" >12.540₺<GreenArrow/></Text>
            </View>
          </View>
        }
      >
        <Text preset="formLabel">Nakit</Text>
      </ListItem>
      <ListItem
        bottomSeparator
        LeftComponent={
          <View style={$listItemLeftComponent}>
            <View style={$listItemLeftIcon}>
              <Bank iconColor={colors.chartPrimary}/>
            </View>
          </View>
        }
        RightComponent={
          <View style={$listItemLeftComponent}>
            <View style={$listItemRightComponent}>
              <Text preset="formLabel" >767.992₺<GreenArrow/></Text>
            </View>
          </View>
        }
      >
        <Text preset="formLabel">Banka Havalesi</Text>
      </ListItem>
    </WidgetCard>
  )
}

const $listItemLeftComponent: ViewStyle = {
  padding: 16,
}
const $listItemLeftIcon: ViewStyle = {
  backgroundColor: colors.chartPrimaryLowOpacity,
  borderRadius: 5,
  height: 40,
  width: 40,
  alignItems: 'center',
  justifyContent: 'center',
}
const $listItemRightComponent: ViewStyle = {
  height: 40,
  justifyContent: 'center',
}
