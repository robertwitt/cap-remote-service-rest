const { getBody } = require("../lib/body");
const { loadModel, FILE_PETSTORE } = require("./testUtils");

describe("Determining the body", () => {
  let model;

  beforeAll(async () => {
    model = await loadModel(FILE_PETSTORE);
  });

  it("can map body only", () => {
    expect(
      getBody(model.definitions["Petstore.pet_post"], {
        body: { id: 42, name: "Lassy" },
      })
    ).toEqual({ id: 42, name: "Lassy" });
  });

  it("can extract body from data with additional parameter", () => {
    expect(
      getBody(model.definitions["Petstore.user__put"], {
        username: "jdoe",
        body: { firstName: "John", lastName: "Doe" },
      })
    ).toEqual({ firstName: "John", lastName: "Doe" });
  });

  it("returns empty object for functions or actions without params", () => {
    expect(
      getBody(model.definitions["Petstore.user_"], { username: "jdoe" })
    ).toEqual({});
  });
});
