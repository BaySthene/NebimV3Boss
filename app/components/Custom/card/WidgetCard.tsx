import { View, ViewProps, ViewStyle } from "react-native"
import React from "react"
import { colors, spacing } from "app/theme"
import { Text, TextProps } from "app/components"
import { MasterCard } from "assets/svg/MasterCard"
import { TxKeyPath } from "app/i18n"
export interface WidgetCardProps extends ViewProps{
  children: React.ReactNode,
  title: TxKeyPath,
  subTitle?: TextProps["tx"],
  headerShown: boolean,
}
export const WidgetCard: React.FC<WidgetCardProps> = ({children,title,subTitle,headerShown = true, ...viewProps}) => {
  return (
    <View {...viewProps} style={$widgetCard}>
      {
        headerShown
        &&
          (
            <View style={$widgetCardHeader}>
              <View style={$widgetCardHeaderLeft}>
                <Text preset="subheading" tx={title}></Text>
                { typeof subTitle !== null && (<Text preset="formHelper" tx={subTitle}></Text>)}
              </View>
              <View style={{backgroundColor: 'rgb(236, 242, 255)', borderRadius: 7, height: 40, width: 40, alignItems: 'center', justifyContent: 'center'}}>
                <MasterCard/>
              </View>
            </View>
          )
      }
      {children}


    </View>
  )
}



const $widgetCard: ViewStyle = {
  width: '100%',
  height: 'auto',
  backgroundColor: colors.cardBackground,
  marginVertical: 16,
  borderRadius:10,
  shadowColor: 'rgb(38, 43, 67)',
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 3.84,
  shadowOpacity: 0.8,
  elevation: 2,
}

const $widgetCardHeader: ViewStyle = {
  width: '100%',
  justifyContent: 'space-between',
  flexDirection: 'row',
  padding: 16,
  flexWrap: 'wrap',
}

const $widgetCardHeaderLeft: ViewStyle = {
}
