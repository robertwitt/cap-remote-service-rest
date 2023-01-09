const cds = require("@sap/cds");
const path = require("path");
const { getMethod } = require("../lib/method");

const PATH_RESOURCES = path.join("test", "resources");
const FILE_PETSTORE = path.join(PATH_RESOURCES, "petstore.csn");

describe("Determining the method", () => {
  let model;

  beforeAll(async () => {
    const csn = await cds.load(FILE_PETSTORE);
    model = cds.linked(csn);
  });

  it("can map to annotated method", () => {
    expect(getMethod(model.definitions["Petstore.user__put"])).toEqual("PUT");
  });

  it("can map to method derived from definition kind", () => {
    expect(getMethod(model.definitions["Petstore.pet_post"])).toEqual("POST");
    expect(getMethod(model.definitions["Petstore.user_"])).toEqual("GET");
  });
});
