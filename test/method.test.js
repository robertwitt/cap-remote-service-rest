const { getMethod } = require("../lib/method");
const { loadModel, FILE_PETSTORE } = require("./testUtils");

describe("Determining the method", () => {
  let model;

  beforeAll(async () => {
    model = await loadModel(FILE_PETSTORE);
  });

  it("can map to annotated method", () => {
    expect(getMethod(model.definitions["Petstore.user__put"])).toEqual("PUT");
  });

  it("can map to method derived from definition kind", () => {
    expect(getMethod(model.definitions["Petstore.pet_post"])).toEqual("POST");
    expect(getMethod(model.definitions["Petstore.user_"])).toEqual("GET");
  });
});
