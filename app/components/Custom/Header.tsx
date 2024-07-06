import { ViewStyle, View, ImageStyle, Image } from "react-native"
import Animated from "react-native-reanimated"
import { Icon } from "app/components"
import { spacing } from "app/theme"
import React from "react"

type headerStyleType = {
  marginHorizontal: number,
  backgroundColor: string,
  elevation: number,
}
interface headerProps {
  headerStyle: headerStyleType,
  toggleDrawerHandle:any
}
export const Header = ({headerStyle,toggleDrawerHandle}:headerProps) => {
  return (
    <Animated.View style={[$header, headerStyle]}>
      <View style={$menuUl}>
        <Icon style={$headerIcon} icon="menu" onPress={() => toggleDrawerHandle()} />
      </View>
      <View style={$menuUl}>
        <Icon style={$headerIcon} icon="translate" />
        <Icon style={$headerIcon} icon="star" />
        <Icon style={$headerIcon} icon="bell" />
        <Image style={{width:45,height: 45, marginHorizontal: spacing.xs}} borderRadius={60} source={{uri: 'https://metropoldigital.com/wp-content/uploads/2022/12/Avatar_TWoW_Neytiri_Textless_Poster-819x1024.webp'}} resizeMode="cover" />
      </View>
    </Animated.View>
  )
}

const $header: ViewStyle = {
  height: 60,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3.84,
  paddingHorizontal: 16,
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginBottom: 3,
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
