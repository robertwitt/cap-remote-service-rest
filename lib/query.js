const { URLSearchParams } = require("url");
const { OpenApiAnnotation, OpenApiParamIn } = require("./constants");

function getQueryString(definition, data) {
  return Object.entries(data)
    .filter(([paramName]) => isQueryParam(definition, paramName))
    .filter(([, paramValue]) => !!paramValue)
    .map(([paramName, paramValue]) => [
      mapParamName(definition, paramName),
      paramValue,
    ])
    .reduce(toQueryParams, new URLSearchParams())
    .toString();
}

function isQueryParam(definition, paramName) {
  const param = definition.params?.[paramName];
  return param?.[OpenApiAnnotation.PARAM_IN] === OpenApiParamIn.QUERY;
}

function mapParamName(definition, paramName) {
  const param = definition.params?.[paramName];
  return param?.[OpenApiAnnotation.PARAM_NAME] ?? paramName;
}

function toQueryParams(queryParams, param) {
  const [paramName, paramValue] = param;
  queryParams.set(paramName, paramValue.toString());
  return queryParams;
}

module.exports = { getQueryString };
