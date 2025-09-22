const { dynamoDb } = require("../config/aws");
const TABLE_NAME = "users";

const createStudent = async (student) => {
  const params = {
    TableName: TABLE_NAME,
    Item: student,
  };
  return dynamoDb.put(params).promise();
};

const getStudentById = async (userID) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { userID: userID },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

const getStudentsByCollegeId = async (collegeId) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "collegeId-index", // assuming GSI on users for collegeId
    KeyConditionExpression: "collegeId = :cid",
    ExpressionAttributeValues: {
      ":cid": collegeId,
    },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items;
};

module.exports = {
  createStudent,
  getStudentById,
  getStudentsByCollegeId,
};
