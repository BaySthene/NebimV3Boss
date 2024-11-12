import { AppStackScreenProps, DashboardScreenProps } from "app/navigators"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import {
  View,
  ViewStyle,
  Vibration,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable, TextInput,
} from "react-native"
import { Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "app/theme"
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native"


interface BarcodeScanCameraScreenSProps extends AppStackScreenProps<"BarcodeScanCamera"> {}

const { width, height } = Dimensions.get('window');

export const BarcodeScanCameraScreen: FC<BarcodeScanCameraScreenSProps> = observer(function DashboardScreen(_props) {
  const { navigation, route } = _props
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraError, setCameraError] = useState('');
  const [flashMode, setFlashMode] = useState('off');
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef(null);
  const isFocused = useIsFocused();

  const overlayHeight = useSharedValue(0);
  const overlayOpacity = useSharedValue(0.2); // Başlangıç opaklık değeri düşük
  const [isAnimating, setIsAnimating] = useState(true); // Animasyon durumu kontrolü

  useEffect(() => {
    if (isAnimating) {
      overlayHeight.value = withRepeat(
        withTiming(height * 0.6, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
        true
      );

      overlayOpacity.value = withRepeat(
        withTiming(0.7, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
        true
      );
    } else {
      // Animasyonu durdur
      cancelAnimation(overlayHeight);
      cancelAnimation(overlayOpacity);
    }
  }, [isAnimating]);

  // Animasyonlu stil
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: overlayHeight.value,
      opacity: overlayOpacity.value,
    };
  });

  // Animasyonu durdurma ve başlatma
  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  if (!permission) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'salmon'
      }}>

      </View>
    );
  }

  if (!permission.granted) {
    return (
      <></>
    );
  }



  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
    >
      <View
        style={{
          margin: spacing.lg,
          flexDirection: 'row',
          alignItems: 'center', // Merkezden hizalamak için
          justifyContent: 'space-between', // Bileşenler arasında boşluk bırakmak için
        }}
      >
        <Icon
          icon="back"
          size={28}
          color={colors.textDim}
          style={{
            zIndex: 5,
            padding: 10,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          preset="subheading"
          text="Barkod Okut"
          style={{
            textAlign: 'center',
            flex: 1,
            zIndex: 4,
          }}
        />
      </View>
      <View style={{
        alignItems: "center",
      }}>
        <View style={{
          width: width * 0.9,
          height: height * 0.6,
          borderRadius: spacing.xl,
          overflow: "hidden",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 20,
          elevation: 2,
        }}>
          {
            isFocused && (
              <CameraView style={[$camera]}  facing={facing} flash="on"
                          active={isFocused}
                          ref={camera}
                          autofocus="on"
                          barcodeScannerSettings={{
                            barcodeTypes: ["qr","ean13","ean8","code128"],
                          }}
                          onBarcodeScanned={(res) => {
                            console.log(res);
                            navigation.push("BarcodeResult", { barcode: res.data });
                          }}
                          onMountError={(error) => {
                            setCameraError(error.message)
                            toggleAnimation()
                          }}
              >
                <View style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: colors.errorLowOpacity,
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: cameraError == '' ? 'none' : 'flex'
                }}>
                  <Icon icon="debug" size={30} color={colors.palette.neutral200} />
                  <Text preset="subheading" style={{ color: colors.palette.neutral200 }} text={cameraError} />


                </View>
                <Animated.View style={[$scanLine, animatedStyle]} />
              </CameraView>
            )
          }

        </View>
        <View style={{
          borderRadius: spacing.xl ,
          backgroundColor: colors.textDim,
          padding: spacing.md,
          marginTop: spacing.md,
        }}>
          <Icon icon="torch" size={spacing.xl} color={colors.background} onPress={() => setFlashMode('on')} />
        </View>
      </View>



    </Screen>
  )


});


const $screenContentContainer: ViewStyle = {
  flex: 1,
}
const $camera: ViewStyle = {
  width: width * 0.9,
  height: height * 0.6,
}
const $scanLine: ViewStyle = {
  width: '100%',
  position: 'absolute',
  bottom: 0,
  backgroundColor: colors.chartPrimaryLowOpacity,
  opacity: 0.5,
  borderRadius: 5,
  borderTopWidth: 3,
  borderColor: colors.chartPrimary,
}