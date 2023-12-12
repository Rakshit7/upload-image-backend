const aws = require("aws-sdk");
const uuid = require("uuid");

const region = "us-east-1";
const bucketName = "image-upload-bucket-one";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

async function generateURL(fName) {
  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
  });
  const uniqueId = uuid.v4();
  const imageName = `${uniqueId}.${fName?.split(".")[1]}`;
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  return {
    url,
    uId: imageName,
  };
}

async function uploadImage(params) {
  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
  });
  const uniqueId = uuid.v4();
  const imageBuffer = Buffer.from(params.split(",")[1], "base64");
  const imageName = `${uniqueId}.png`;
  const bodyParams = {
    Bucket: bucketName,
    Key: imageName,
    Body: imageBuffer,
    ContentType: "image/png",
  };
  try {
    const data = await s3.upload(bodyParams).promise();
    return data;
  } catch (e) {
    return {
      statusCode: 500,
      response: "Error",
    };
  }
}

async function getAllImage() {
  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
  });
  const d = await s3.listObjects({ Bucket: bucketName }).promise();
  const baseUrl = `https://s3.amazonaws.com/${bucketName}`;
  const res = d?.Contents?.map((a) => ({
    fileName: `${baseUrl}/${a.Key}`,
    lastModified: a.LastModified,
  }));
  return res;
}

module.exports = { generateURL, getAllImage, uploadImage };
