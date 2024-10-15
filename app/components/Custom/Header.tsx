import { ViewStyle, View, ImageStyle, Image, TextStyle } from "react-native"
import Animated from "react-native-reanimated"
import { Icon, Text } from "app/components"
import { spacing } from "app/theme"
import React, { useState } from "react"
import { Dropdown } from "react-native-element-dropdown"

type headerStyleType = {
  marginHorizontal: number,
  backgroundColor: string,
  elevation: number,
}
interface headerProps {
  headerStyle: headerStyleType,
  toggleDrawerHandle:any,
  avatar: string
}

export const Header = ({headerStyle,toggleDrawerHandle, avatar}:headerProps) => {
  return (
    <Animated.View style={[$header, headerStyle]}>
      <View style={$menuUl}>
        <Icon style={$headerIcon} icon="menu" onPress={() => toggleDrawerHandle()} />
      </View>
      <View style={$menuUl}>
        <Icon style={$headerIcon} icon="translate" />
        <Icon style={$headerIcon} icon="star" />
        <Icon style={$headerIcon} icon="bell" />
        <Image style={{width:45,height: 45, marginHorizontal: spacing.xs}} borderRadius={60} source={{uri: avatar}} resizeMode="cover" />
      </View>
    </Animated.View>
  )
}

const $header: ViewStyle = {
  height: 60,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
  paddingHorizontal: 16,
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: 3,
  top: 0,
  left:0,
  right: 0,
  position: 'absolute',
  zIndex: 1,
}

const $menuUl: ViewStyle = {
  height: '100%',
  alignItems: 'center',
  flexDirection: 'row',
}

const $headerIcon: ImageStyle = {
  marginHorizontal: 10,
  height: 24,
  width: 24,
}
