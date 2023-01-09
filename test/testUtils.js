const cds = require("@sap/cds");
const path = require("path");

const PATH_RESOURCES = path.join("test", "resources");
const FILE_PETSTORE = path.join(PATH_RESOURCES, "petstore.csn");

async function loadModel(file) {
  const csn = await cds.load(file);
  return cds.linked(csn);
}

module.exports = { PATH_RESOURCES, FILE_PETSTORE, loadModel };
