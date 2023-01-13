# Remote REST Service Implementation for SAP Cloud Application Programming Model

This library contains a generic implementation to invoke remote REST services in a CAP Node.js app. REST (or REST-like) APIs described in OpenAPI can be imported as CDS service models. The app interacts with the remote API using the well-known CAP APIs.

## Installation

The remote REST service implementation can be installed via NPM:

```bash
npm install cap-remote-service-rest
```

## Configuration

You can generate a CDS service model from an OpenAPI document using the CAP development kit `@sap/cds-dk`:

```bash
cds import Petstore.json
```

Each schema in OpenAPI is imported as type and each service path as [unbound function](https://cap.cloud.sap/docs/cds/cdl#actions) (for GET endpoints) or action (everything else). See more details in the [CAP release notes](https://cap.cloud.sap/docs/releases/jun22?q=openapi#import-openapi).

Create a new Javascript file, add a class and make it inheriting from `RestRemoteService`. This service implementation translates OData action and function requests into REST HTTP requests that are sent to the remote system using [CAP's remote service API](https://cap.cloud.sap/docs/node.js/remote-services).

```javascript
const { RestRemoteService } = require("cap-remote-service-rest");

class PetstoreService extends RestRemoteService {}

module.exports = PetstoreService;
```

Define this class as service implementation for your imported service model in the `cds.requires` section of `.cdsrc.json` or `package.json`:

```json
{
  "cds": {
    "requires": {
      "Petstore": {
        "kind": "rest",
        "model": "srv/external/PetstoreService",
        "impl": "srv/external/PetstoreService.js"
      }
    }
  }
}
```

## Runtime

To invoke the remote REST service you can simply connect to the CDS service and invoke its [unbound action or functions](https://cap.cloud.sap/docs/node.js/services#-unbound-actions--functions):

```javascript
const srv = await cds.connect.to("Petstore");
const results = await srv.send("pet_findByStatus", { status: "available" });
```

## Customization

Optionally, you can customize the headers and query parameters of the request towards the remote API by overwriting the appropriate methods in the service class, for instance to add an API key:

```javascript
class PetstoreService extends RestRemoteService {
  /**
    @param object a plain Javascript object
   */
  customizeHeaders(headers) {
    headers["api_key"] = "secret";
  }

  /**
    @param queryParams an `URLSearchParam` object
   */
  customizeQueryParams(queryParams) {
    queryParams.set("api_key", "secret");
  }
}
```
