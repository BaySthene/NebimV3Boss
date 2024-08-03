import React from "react"
import * as DropdownMenu from 'zeego/dropdown-menu';
import { Button, ImageStyle, Text } from "react-native"
import { Icon } from "app/components"

export interface DropDownMenuProps {
  items: Array<{
    key: string;
    title: string;
    icon: string;
    iconAndroid?: string;
  }>;
  onSelect: (key: string) => void;
}
const DropDownMenu: React.FC<DropDownMenuProps> = ({ items, onSelect }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Icon style={$headerIcon} icon="translate" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <Text>Merhaba</Text>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const $headerIcon: ImageStyle = {
  marginHorizontal: 10,
  height: 24,
  width: 24,
}

export default DropDownMenu;
