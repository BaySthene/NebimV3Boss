import { AppStackScreenProps, DashboardScreenProps } from "app/navigators"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import Animated from "react-native-reanimated"
import { View, ViewStyle, Vibration, ScrollView, TextInput } from "react-native"
import { Icon, IconTypes, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


interface DashboardScreenSProps extends DashboardScreenProps<"ProductSearchScreen"> {}


export const ProductSearchScreen: FC<DashboardScreenSProps> = observer(function DashboardScreen(_props) {
  const { navigation, route } = _props
  const [permission, requestPermission] = useCameraPermissions();
  const [productInput, setProductInput] = useState('');
  const productSearchInput = useRef<TextInput>(null);
  let searchIcon: IconTypes = 'scanner';

  const productScanHandle = async () => {
        const perm = requestPermission().then((res) => {
          if(res.status === 'granted'){
            navigation.navigate("BarcodeScanCamera");
          }else {
            console.log('İzin Verilmedi')
          }
        });

  }

  const insets = useSafeAreaInsets();
  useEffect(() => {
    if(productInput == '') {
      searchIcon = 'scanner';
    }else {
      searchIcon = 'send';
    }
  }, [productInput])

  const ProductRightAccessory = useMemo(
    () =>
      function ProductRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <View style={{
            height: "100%",
            width: 'auto',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <View style={{
              backgroundColor: colors.bannerBackground,
              marginRight: spacing.md,
              padding: spacing.sm,
              borderRadius: spacing.sm,
            }}>
              {
                productInput == '' ? (
                  <Icon icon={searchIcon} color={colors.textDim} size={20} onPress={productScanHandle}/>

                ) : (
                  <Icon icon={searchIcon} color={colors.textDim} size={20} onPress={productScanHandle}/>
                )
              }
            </View>

          </View>
        )
      },
    [],
  )
// export const DashboardScreen: FC<any> = ({ handleEvent }) => {
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top","bottom"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View
        style={$scrollView}
      >
       <TextField inputWrapperStyle={{
                   marginVertical: spacing.lg,
                   backgroundColor: colors.cardBackground,
                   borderWidth: 0,
                   borderRadius: spacing.md,
                  }}
                  style={{
                    marginVertical: spacing.lg,
                    marginLeft: spacing.lg,
                  }}
                  value={productInput}
                  onChangeText={(text) => setProductInput(text)}
                  placeholderTextColor={colors.border}
                  placeholder="Ürün Ara.. Barkod veya Ürün Kodu"
                  RightAccessory={ProductRightAccessory}
                  ref={productSearchInput}
       />
        <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
          <View style={{
            alignContent: "space-between",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: 'row',
            marginBottom: spacing.lg,
          }}>
            <Text preset="formLabel"  style={{
              color: colors.textDim,
            }} > Arama Geçmişi</Text>
            <Icon icon="history" color={colors.textDim} size={22} />
          </View>

          <View style={{
            marginBottom: spacing.lg,
            height: 100,
            backgroundColor: colors.cardBackground,
            borderRadius: spacing.md,
          }}
          >

          </View>

        </Animated.ScrollView>





      </View>

    </Screen>
  )


});



const $scrollView: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal:spacing.lg,
  paddingTop: 16,
}
const $screenContentContainer: ViewStyle = {
  flex: 1
}