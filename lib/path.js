const { URLSearchParams } = require("url");
const { OpenApiAnnotation, OpenApiParamIn } = require("./constants");

const PLACEHOLDER_REGEX = /(?<=\{)(.*)(?=\})/g;

function getPath(definition, data = {}, customize = (queryParams) => {}) {
  const pathTemplate = definition[OpenApiAnnotation.PATH] ?? "";
  const path = pathTemplate
    .split("/")
    .map((segment) => replacePlaceholder(segment, data))
    .join("/");
  const queryString = getQueryString(definition, data, customize);

  return path + (queryString.length ? "?" + queryString : "");
}

function replacePlaceholder(segment, data) {
  const match = segment.match(PLACEHOLDER_REGEX);
  if (!match) {
    return segment;
  }

  const paramName = match[0];
  const paramValue = data[paramName];
  if (!!paramValue) {
    return paramValue.toString();
  } else {
    throw new CapError(400, `Value for path parameter '${paramValue}' missing`);
  }
}

function getQueryString(definition, data, customize) {
  const queryParams = Object.entries(data)
    .filter(([paramName]) => isQueryParam(definition, paramName))
    .filter(([, paramValue]) => !!paramValue)
    .map(([paramName, paramValue]) => [
      mapParamName(definition, paramName),
      paramValue,
    ])
    .reduce(toQueryParams, new URLSearchParams());

  customize(queryParams);
  return queryParams.toString();
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

module.exports = { getPath };
