const AWS = require("aws-sdk");
const configVal = {
  region: "us-east-1",
  accessKeyId: "AKIAY2XCIO3HNYIMYI7O",
  secretAccessKey: "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",
};
AWS.config.update(configVal);
console.log(AWS.config.region);

const db = new AWS.DynamoDB.DocumentClient();

const table = "imageuploadinfo";

module.exports = { db, table };
