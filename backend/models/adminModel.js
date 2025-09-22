const { dynamoDb } = require("../config/aws");

const TABLE_NAME = "admins";

const createAdmin = async (admin) => {
  const params = {
    TableName: TABLE_NAME,
    Item: admin,
  };
  return dynamoDb.put(params).promise();
};

const getAdminById = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { userID: userId },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

module.exports = {
  createAdmin,
  getAdminById,
};
