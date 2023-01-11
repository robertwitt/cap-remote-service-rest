const { OpenApiAnnotation, OpenApiParamIn } = require("./constants");

function getHeaders(definition, data = {}, customize = (headers) => {}) {
  const headers = Object.entries(data)
    .filter(([paramName]) => isHeader(definition, paramName))
    .filter(([, paramValue]) => !!paramValue)
    .reduce(toHeaders, {});

  customize(headers);
  return headers;
}

function isHeader(definition, paramName) {
  const param = definition.params?.[paramName];
  return param?.[OpenApiAnnotation.PARAM_IN] === OpenApiParamIn.HEADER;
}

function toHeaders(headers, param) {
  const [paramName, paramValue] = param;
  headers[paramName] = paramValue;
  return headers;
}

module.exports = { getHeaders };
