const fetch = require("node-fetch");
console.log(process.env.CIRCLE_COMPARE_URL + " / " + process.env.CIRCLE_SHA1);
const url = `${process.env.AXCEPT_SERVICE_URL}/test-mgmt/test-run/${
  process.env.AXCEPT_ENV_ID
}`;
fetch(url, {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, cors, *same-origin
  headers: {
    "Content-Type": "application/json",
    "a-token": process.env.AX_CI_AUTH_TOKEN,
    Authorization:
      "Basic " +
      Buffer.from(
        process.env.AXCEPT_HTTP_AUTH_USERNAME +
          ":" +
          process.env.AXCEPT_HTTP_AUTH_PASSWORD
      ).toString("base64")
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  body: JSON.stringify({
    triggeredBy: process.env.CIRCLE_USERNAME,
    clientVersion:
      process.env.CIRCLE_BRANCH + ":" + process.env.CIRCLE_BUILD_NUM
  }) // body data type must match "Content-Type" header
}).then(response => console.log(response));
