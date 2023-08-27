// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
import serverless from 'serverless-http';
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const app = require('../dist/app');

const handler = serverless(app.default);

// eslint-disable-next-line no-undef
module.exports.handler = async (event: any, context: any) => {
  return await handler(event, context);
}; 