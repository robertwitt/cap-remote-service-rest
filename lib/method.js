const { DefinitionKind, Method, OpenApiAnnotation } = require("./constants");

function getMethod(definition) {
  const method = definition[OpenApiAnnotation.METHOD];
  if (method) {
    return method;
  }
  return definition.kind === DefinitionKind.ACTION ? Method.POST : Method.GET;
}

module.exports = { getMethod };
