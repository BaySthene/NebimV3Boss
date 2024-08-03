import { View, ViewStyle } from "react-native"
import { colors } from "app/theme"
import { ListItem, Text } from "app/components"
import React from "react"

interface ListProps {
  leftComponentType: 'dot' | 'icon';
  dotColor?: string | undefined;
  leftIcon?: React.ReactNode;
  label: string;
  rightComponent: React.ReactNode;
}
export const List: React.FC<ListProps> = ({ leftComponentType, dotColor = colors.chartPrimaryLowOpacity, leftIcon, label,rightComponent }) => {
  return (
    <ListItem
      bottomSeparator
      LeftComponent={
        <View style={$listItemLeftComponent}>
          {
            leftComponentType === 'icon' ? (
              <View style={$listItemLeftIcon}>
                {leftIcon}
              </View>
            ) : (
              <View style={[$listItemLeftDot, { backgroundColor: dotColor }]} />
            )
          }
        </View>
      }
      RightComponent={
        <View style={$listItemLeftComponent}>
          <View style={$listItemRightComponent}>
            {rightComponent}
          </View>
        </View>
      }
    >
      <Text preset="formLabel">{label}</Text>
    </ListItem>
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
const $listItemLeftDot: ViewStyle = {

  borderRadius: 10,
  height: 20,
  width: 20,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 10,
}
const $listItemRightComponent: ViewStyle = {
  height: 40,
  justifyContent: 'center',
}
