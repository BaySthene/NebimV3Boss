import { View } from "react-native"
import { colors, spacing } from "app/theme"
import { Text } from "app/components"
import React from "react"

export const SearchProductInventory = ({ productInventoryData }) => {

  const InventoryData :any[] = productInventoryData.dataList;

  console.log(productInventoryData);
  return (
    <>
      { /* Envanter Kapsayıcı View'i Başlangıcı */}
      <View style={{
        marginBottom: spacing.xl,
      }}>

        <Text preset="subheading" style={{ marginTop: spacing.md }}>Envanter</Text>

        {
          InventoryData.map((inventoryHeading) => {
            const warehouseCount = inventoryHeading.dimensions[0].warehouses.length;
            const warehouses: any[] = inventoryHeading.dimensions[0].warehouses;
            return (
              <>
                { /* Envanter Başlık Kısmı Başlangıcı */ }
                <View key={inventoryHeading.colorCode} style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  backgroundColor: colors.cardBackground,
                  marginTop: spacing.md,
                  marginBottom: spacing.xxs,
                  borderRadius: spacing.md,
                  flexDirection: 'row',
                }}>
                  {
                    inventoryHeading.itemDimTypeCode != 0 && (
                      <Text preset="bold" style={{ textAlign: 'center', width: '25%', borderRightWidth: 1, borderColor: colors.background }}>Renk</Text>
                    )
                  }
                  <Text preset="bold" style={{ textAlign: 'center', width:  inventoryHeading.itemDimTypeCode != 0 ? '75%' : '100%' }}>Envanter</Text>

                </View>
                { /* Envanter Başlık Kısmı Bitişi */ }

                { /* Envanter Renk Gösterimi Kapsayıcı View'i Başlangıcı */ }
                <View style={{
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                  backgroundColor: colors.cardBackground,
                  borderRadius: spacing.md,
                  borderColor: colors.background, borderBottomWidth: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginBottom: spacing.xxs,
                }}>
                  { /* Envanter Renk Gösterimi Row'u Başlangıcı */ }
                  <Text preset="formLabel" style={{ textAlign: 'center', width: '25%', borderRightWidth: 1, borderColor: colors.background }}>{inventoryHeading.itemDimTypeCode != 0 ? inventoryHeading.colorDescription : 'Toplam Envanter'}</Text>
                  <View style={{ width: '75%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text preset="formLabel" style={{ textAlign: 'center' }}>{inventoryHeading.totalQty}</Text>
                  </View>
                  { /* Envanter Renk Gösterimi Row'u Bitişi */ }

                  { /* Envanter Depo Gösterimi Row'u Başlangıcı */ }
                  <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: spacing.sm,
                    borderTopWidth: 1,
                    borderColor: colors.background,
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      {
                        inventoryHeading.itemDimTypeCode == 2 && (
                          <View style={{ width: '25%', borderRightWidth: 1, borderColor: colors.background }} />

                        )
                      }
                      <View style={{ flexDirection: 'row', width: inventoryHeading.itemDimTypeCode == 2 ? '75%' : '100%', flexWrap: 'wrap' }}>
                        <View style={{
                          flexDirection: 'row',
                          width: '100%',
                          borderBottomWidth: 1,
                          borderColor: colors.background,
                          alignItems: 'center',
                          paddingVertical: spacing.xxs
                        }}>
                          {
                            warehouses.map((warehouse) => {
                              return (
                                <Text preset="formLabel" style={{ textAlign: 'center', width: `${100 / warehouseCount}%`, borderRightWidth: 1, borderColor: colors.background  }}>{warehouse.warehouseDescription}</Text>
                              )
                            })
                          }
                        </View>

                      </View>
                    </View>

                  </View>
                  { /* Envanter Depo Gösterimi Row'u Bitişi */ }


                  { /* Envanter Varyant Bazlı Envanter Gösterimi Depolar Yan Yana Başlangıcı */ }
                  {
                    inventoryHeading.dimensions.map((dimension) => {
                      return (
                        <View style={{
                          width: '100%',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                          <View style={{ flexDirection: 'row' }}>
                            {
                              inventoryHeading.itemDimTypeCode == 2 && (
                                <View style={{ width: '25%', height: 'auto', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderColor: colors.background, borderTopWidth: 1 }}>
                                  <Text preset="formLabel" style={{ textAlign: 'center',  }}>{ dimension.dimCode }</Text>
                                </View>
                              )
                            }

                            <View style={{ flexDirection: 'row', width: inventoryHeading.itemDimTypeCode == 2 ? '75%' : '100%', flexWrap: 'wrap' }}>
                              <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                borderColor: colors.background,
                                alignItems: 'center',
                                paddingVertical: spacing.xxs
                              }}>
                                {
                                  dimension.warehouses.map((warehouse) => {
                                    return (
                                      <Text preset="formLabel" style={{ textAlign: 'center', width: `${100 / warehouseCount}%`, borderRightWidth: 1, borderColor: colors.background  }}>{warehouse.warehouseQty}</Text>

                                    )
                                  })
                                }
                              </View>
                            </View>
                          </View>

                        </View>
                      )
                    })
                  }
                  { /* Envanter Varyant Bazlı Envanter Gösterimi Depolar Yan Yana Bitişi */ }




                </View>
                { /* Envanter Renk Gösterimi Kapsayıcı View'i Bitişi */ }

              </>
            )
          })
        }
      </View>
      { /* Envanter Kapsayıcı View'i Bitişi */}
    </>
  )
}