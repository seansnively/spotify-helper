const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { Lambda, InvokeCommand } = require("@aws-sdk/client-lambda");

exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));

  // create AWS SDK clients
  const dynamo = new DynamoDB();
  const lambda = new Lambda();

  // update dynamo entry for "path" with hits++
  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME,
    Key: { path: { S: event.path } },
    UpdateExpression: "ADD hits :incr",
    ExpressionAttributeValues: { ":incr": { N: "1" } },
  });

  // call downstream function and capture response
  const command = new InvokeCommand({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event),
  });

  const { Payload } = await lambda.send(command);
  const resultBody = JSON.parse(Buffer.from(Payload).toString());

  console.log("downstream response:", JSON.stringify(resultBody, undefined, 2));

  // return response back to upstream caller

  let response  = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(resultBody.body)
  }

  return response;
};

