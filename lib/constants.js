const DefinitionKind = {
  ACTION: "action",
  FUNCTION: "function",
};

const Method = {
  GET: "GET",
  POST: "POST",
};

const OpenApiAnnotation = {
  METHOD: "@openapi.method",
  PATH: "@openapi.path",
  PARAM_IN: "@openapi.in",
  PARAM_NAME: "@openapi.name",
};

const OpenApiParamIn = {
  BODY: "body",
  HEADER: "header",
  PATH: "path",
  QUERY: "query",
};

module.exports = { DefinitionKind, Method, OpenApiAnnotation, OpenApiParamIn };
