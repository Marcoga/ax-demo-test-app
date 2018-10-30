const fetch = require("node-fetch");
const url = `${process.env.AXCEPT_SERVICE_URL}/test-mgmt/test-run/${
  process.env.AXCEPT_ENV_ID
}`;
fetch(url, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, cors, *same-origin
  headers: {
    "a-token": process.env.AX_CI_AUTH_TOKEN
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  body: JSON.stringify({
    triggeredBy: process.env.TRIGGERED_BY,
    clientVersion: process.env.CLIENT_VERSION
  }) // body data type must match "Content-Type" header
}).then(response => console.log(response));
