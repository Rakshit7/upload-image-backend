const AWS = require("aws-sdk");
const { table, db } = require("./db.config");

const addLocation = async (data) => {
  console.log("data", data);
  const params = {
    TableName: table,
    Item: data,
  };

  try {
    console.log("region", AWS.config.region);
    await db.put(params).promise();
    return {
      statusCode: 200,
      message: "Created",
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      message: "Error while creating record",
    };
  }
};

const getAllLocation = async () => {
  try {
    const params = {
      TableName: table,
    };

    const res = await db.scan(params).promise();
    return {
      statusCode: 200,
      message: res?.Items,
    };
  } catch (e) {
    return {
      statusCode: 500,
      message: "Error while retriving value",
    };
  }
};

module.exports = { addLocation, getAllLocation };
