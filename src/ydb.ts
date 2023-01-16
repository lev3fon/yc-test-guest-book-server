const {Driver, getCredentialsFromEnv, getLogger} = require('ydb-sdk');
const logger = getLogger({level: 'debug'});
const endpoint = 'grpcs://ydb.serverless.yandexcloud.net:2135';
const database = '/ru-central1/b1gdpjl18f3lnmle6cdu/etn5eirg4nu3m00t3872';
const authService = getCredentialsFromEnv();
// @ts-ignore
const { Message } = require('./data-helpers')
const driver = new Driver({endpoint, database, authService});
let driverReady = false


// const {
//   BatchWriteItemCommand,
//   BatchWriteItemInput,
//   DeleteItemCommand,
//   DeleteItemCommandInput,
//   DynamoDBClient,
//   GetItemCommand,
//   GetItemCommandInput,
//   GetItemCommandOutput,
//   PutItemCommand,
//   PutItemCommandInput,
//   QueryCommand,
//   QueryCommandInput,
//   QueryCommandOutput,
//   UpdateItemCommand,
//   UpdateItemCommandInput,
//   WriteRequest
// } = require("@aws-sdk/client-dynamodb");
// const {marshall, unmarshall} = require("@aws-sdk/util-dynamodb");
const { nanoid } = require('nanoid')
// const { getToken } = require('./iam')
const TABLE = 'Messages'

// const ddbClient = new DynamoDBClient({
//   region: "ru-central-1",
//   endpoint: 'https://docapi.serverless.yandexcloud.net/ru-central1/b1gdpjl18f3lnmle6cdu/etn5eirg4nu3m00t3872',
// });

// @ts-ignore
async function waitDriver() {
  if (!await driver.ready(10000)) {
    logger.fatal(`Driver has not become ready in 10 seconds!`);
    process.exit(1);
  }

  driverReady = true


  // await driver.tableClient.withSession(async (session) => {
  //   // executing requests in a specific session
  // });
}

// function callWithToken(operation) {
//   ddbClient.middlewareStack.add(
//     (next) => async (arguments_) => {
//       const request = arguments_.request;
//       const token = await getToken();
//       console.log('ВОТ ТОКЕН:', token)
//       request.headers["Authorization"] = "Bearer " + token.token;
//       return next(arguments_);
//     },
//     {
//       step: "finalizeRequest",
//     }
//   );
//   return operation.apply({});
// }

// @ts-ignore
const saveMessage = async ({ text = '', creatorName = '', creatorIp = '' }) => {
  const strId = nanoid()
  const createdAt = Date()

//   await driver.tableClient.withSession(async (session: { executeQuery: (arg0: string) => any; }) => {
//     const query = `
// UPSERT INTO ${TABLE} (strId, createdAt, text, creatorName, creatorIp) VALUES
// ("${strId}", null, "${text}", "${creatorName}", "${creatorIp}");`;
//     // logger.info('Making an upsert...');
//     await session.executeQuery(query);
//     // logger.info('Upsert completed');
//   })

  const prom = new Promise(async (resolve, reject) => {
    await driver.tableClient.withSession(async (session: { executeQuery: (arg0: string) => any; }) => {
      const query = `
UPSERT INTO ${TABLE} (strId, createdAt, text, creatorName, creatorIp) VALUES
("${strId}", null, "${text}", "${creatorName}", "${creatorIp}");`;
      // logger.info('Making an upsert...');
      await session.executeQuery(query);
      resolve('ok')
      // logger.info('Upsert completed');
    })
  })

  return prom

  // return 'ok'
}

// @ts-ignore
const getAllMessages = async () => {
  const query = `
SELECT *
FROM ${TABLE};`

  // let res

  const prom = new Promise(async (resolve, reject) => {
    await driver.tableClient.withSession(async (session: { executeQuery: (arg0: string) => PromiseLike<{ resultSets: any; }> | { resultSets: any; }; }) => {
      logger.info('Making a simple select...');
      const {resultSets} = await session.executeQuery(query);
      const res = Message.createNativeObjects(resultSets[0])
      resolve(res)
      logger.info(`selectSimple result: ${ JSON.stringify(res, null, 2) }`);
    })
  })

  return prom
}

module.exports = {
  saveMessage,
  waitDriver,
  getAllMessages,
}
