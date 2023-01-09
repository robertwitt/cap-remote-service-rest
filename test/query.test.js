const { getQueryString } = require("../lib/query");
const { loadModel, FILE_PETSTORE } = require("./testUtils");

describe("Determining the query string", () => {
  let model;

  beforeAll(async () => {
    model = await loadModel(FILE_PETSTORE);
  });

  it("returns for function with single parameter", () => {
    expect(
      getQueryString(model.definitions["Petstore.pet_findByStatus"], {
        status: "sold",
      })
    ).toEqual("status=sold");
  });

  it("ignores non-query parameter", () => {
    expect(
      getQueryString(model.definitions["Petstore.pet__post"], {
        petId: 1,
        name: "Lassy",
        status: "sold",
      })
    ).toEqual("name=Lassy&status=sold");
  });

  it("ignores null or undefined as parameter values", () => {
    expect(
      getQueryString(model.definitions["Petstore.user_login"], {
        username: null,
        password: undefined,
      })
    ).toEqual("");
  });
});
