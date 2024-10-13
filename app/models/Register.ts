import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const RegisterModel = types
  .model("Register")
  .props({
    firstName: types.string,
    lastName: types.string,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    setFirstName(value: string) {
      store.firstName = value
    },
    setLastName(value: string) {
      store.lastName = value
    },

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Register extends Instance<typeof RegisterModel> {}
export interface RegisterSnapshotOut extends SnapshotOut<typeof RegisterModel> {}
export interface RegisterSnapshotIn extends SnapshotIn<typeof RegisterModel> {}
