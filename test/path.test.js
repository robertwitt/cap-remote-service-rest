const { getPath } = require("../lib/path");
const { loadModel, FILE_PETSTORE } = require("./testUtils");

describe("Determining the path", () => {
  let model;

  beforeAll(async () => {
    model = await loadModel(FILE_PETSTORE);
  });

  it("can map to path without any parameters", () => {
    expect(getPath(model.definitions["Petstore.store_inventory"])).toEqual(
      "/store/inventory"
    );
  });

  it("can map to path with path parameters", () => {
    expect(getPath(model.definitions["Petstore.pet_"], { petId: 42 })).toEqual(
      "/pet/42"
    );
  });

  it("can map to path with query parameters", () => {
    expect(
      getPath(model.definitions["Petstore.user_login"], {
        username: "jdoe",
        password: "Welcome1",
      })
    ).toEqual("/user/login?username=jdoe&password=Welcome1");
  });

  it("can map to path with path and query parameters", () => {
    expect(
      getPath(model.definitions["Petstore.pet__uploadImage_post"], {
        petId: 42,
        additionalMetadata: "data",
      })
    ).toEqual("/pet/42/uploadImage?additionalMetadata=data");
  });
});
