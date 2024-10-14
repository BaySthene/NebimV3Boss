import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RegisterModel } from "app/models/Register"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    userId: types.maybe(types.string),
    authEmail: "",
    isAuthenticatedP: types.maybe(types.boolean),
    authTaxId: types.optional(types.string,""),
    authUserId: types.maybe(types.string),
    register: types.optional(RegisterModel,{firstName: "", lastName: ""}),
    expiresIn: types.maybe(types.string),
    refreshToken: types.maybe(types.string),
    grantType: types.optional(types.string, 'client_credentials')
  })
  .views((store) => ({
    get isAuthenticated() {
      return store.isAuthenticatedP
    },
    get isRegistered() {
      return !!store.authToken
    },
    get isRecorded() {
      return !!store.authTaxId;

    },

    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setUserId(value?: string) {
      store.userId = value
    },
    setGrantType(value: string) {
      store.grantType = value
    },
    setIsAuthenticated(value: boolean ) {
      store.isAuthenticatedP = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setAuthTaxId(value: string) {
      store.authTaxId = value
    },
    setExpireIn(value: string, s: string) {
      store.expiresIn = value
    },
    setRefreshToken(value: string) {
      store.refreshToken = value
    },
    logout() {
      store.isAuthenticatedP = false
      store.authEmail = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
