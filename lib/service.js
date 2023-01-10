const cds = require("@sap/cds");
const { getMethod } = require("./method");
const { getPath } = require("./path");

class RestRemoteService extends cds.RemoteService {
  async init() {
    this.before("*", "*", (req) => {
      const fullyQualifiedName = this.namespace + "." + req.event;
      const definition = this.model.definitions[fullyQualifiedName];

      req.method = getMethod(definition);
      req.path = getPath(definition, req.data);
      req.data = {}; // TODO Translate request body
      req.event = undefined;
    });

    await super.init();
  }
}

module.exports = { RestRemoteService };
