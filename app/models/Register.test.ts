import { RegisterModel } from "./Register"

test("can be created", () => {
  const instance = RegisterModel.create({})

  expect(instance).toBeTruthy()
})
