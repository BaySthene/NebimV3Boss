module.exports = {
  assets: ['./assets/font'],

  // This prevents FlashList from rendering a large red box.
  // See: https://github.com/reactwg/react-native-new-architecture/discussions/135
  // Remove when FlashList fully supports the new architecture.
  // https://github.com/Shopify/flash-list/pull/550
  //
  project: {
    android: {
      unstable_reactLegacyComponentNames: ["CellContainer", "AutoLayoutView"],
    },
    ios: {
      unstable_reactLegacyComponentNames: ["CellContainer", "AutoLayoutView"],
    },
  },
}
