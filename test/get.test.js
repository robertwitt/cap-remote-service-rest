const cds = require("@sap/cds");
const path = require("path");

const PATH_RESOURCES = path.join("test", "resources");
const FILE_PETSTORE = path.join(PATH_RESOURCES, "petstore.csn");

describe("GET requests", () => {
  let model;

  beforeAll(async () => {
    const csn = await cds.load(FILE_PETSTORE);
    model = cds.linked(csn);
  });

  it("can load model", () => {
    expect(model.definitions).toBeDefined();
  });
});
