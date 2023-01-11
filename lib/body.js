const { OpenApiAnnotation, OpenApiParamIn } = require("./constants");

function getBody(definition, data = {}) {
  const param = Object.values(definition.params ?? {}).find(isBodyParam);
  return !param ? {} : data[param.name];
}

function isBodyParam(param) {
  return param[OpenApiAnnotation.PARAM_IN] === OpenApiParamIn.BODY;
}

module.exports = { getBody };
