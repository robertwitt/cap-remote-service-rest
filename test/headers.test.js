const { getHeaders } = require("../lib/headers");
const { loadModel, FILE_PETSTORE } = require("./testUtils");

describe("Determining the headers", () => {
  let model;

  beforeAll(async () => {
    model = await loadModel(FILE_PETSTORE);
  });

  it("can map headers", () => {
    expect(
      getHeaders(model.definitions["Petstore.pet__delete"], {
        api_key: "secret",
        petId: 42,
      })
    ).toEqual({ api_key: "secret" });
  });

  it("returns empty object if no headers", () => {
    expect(
      getHeaders(model.definitions["Petstore.user_login"], {
        username: "jdoe",
        password: "Welcome1",
      })
    ).toEqual({});
  });

  it("can map headers with additional customizer", () => {
    expect(
      getHeaders(
        model.definitions["Petstore.user_login"],
        {
          username: "jdoe",
          password: "Welcome1",
        },
        (headers) => (headers["apiKey"] = "secret")
      )
    ).toEqual({ apiKey: "secret" });
  });
});
