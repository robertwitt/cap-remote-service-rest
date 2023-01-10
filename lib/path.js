const { OpenApiAnnotation } = require("./constants");
const { getQueryString } = require("./query");

const PLACEHOLDER_REGEX = /(?<=\{)(.*)(?=\})/g;

function getPath(definition, data = {}) {
  const pathTemplate = definition[OpenApiAnnotation.PATH] ?? "";
  const path = pathTemplate
    .split("/")
    .map((segment) => replacePlaceholder(segment, data))
    .join("/");
  const queryString = getQueryString(definition, data);

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

module.exports = { getPath };
