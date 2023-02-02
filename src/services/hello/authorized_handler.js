const {ClaimsInfoDecorator} = require("../../common/decorators/ClaimsInfoDecorator");

async function hello_auth(event, userId) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello World, my ID is ${userId}`,
      },
    ),
  };
}

const handler = (event) => ClaimsInfoDecorator(hello_auth, event)

module.exports = {
  handler,
}