const { dynamoDb } = require("../config/aws");
const { getPresignedUrl } = require("../utils/awsS3Helper");
const TABLE_NAME = "documents";
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
// Create a new document
const createDocument = async (document) => {
  const params = {
    TableName: TABLE_NAME,
    Item: document,
  };
  return dynamoDb.put(params).promise();
};

// Get a document by its unique document_id
const getDocumentById = async (documentId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { document_id: documentId },
  };
  const result = await dynamoDb.get(params).promise();
  if (!result.Item) return null;

  result.Item.s3Url = getPresignedUrl(BUCKET_NAME, result.Item.s3Key);
  return result.Item;
};

// Query documents by collegeId using the GSI 'collegeId-index'
const getDocumentsByCollegeId = async (collegeId) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "collegeId-index",
    KeyConditionExpression: "collegeId = :cid",
    ExpressionAttributeValues: {
      ":cid": collegeId,
    },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items;
};

// Query documents by userId using the GSI 'userId-index'
const getDocumentsByUserId = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "userId-index",
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: {
      ":uid": userId,
    },
  };
  const result = await dynamoDb.query(params).promise();
  // Add presigned URLs to documents
  const itemsWithUrl = result.Items.map((item) => {
    const url = getPresignedUrl(BUCKET_NAME, item.s3Key);
    return { ...item, s3Url: url };
  });

  return itemsWithUrl;
};

// Update a document by its unique document_id
const updateDocumentById = async (documentId, updateData) => {
  const updateExpression = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  for (const key in updateData) {
    updateExpression.push(`#${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = updateData[key];
    expressionAttributeNames[`#${key}`] = key;
  }

  const params = {
    TableName: TABLE_NAME,
    Key: { document_id: documentId },
    UpdateExpression: "SET " + updateExpression.join(", "),
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamoDb.update(params).promise();
  return result.Attributes;
};

// Delete a document by its unique document_id
const deleteDocumentById = async (documentId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { document_id: documentId },
  };
  return dynamoDb.delete(params).promise();
};

module.exports = {
  createDocument,
  getDocumentById,
  getDocumentsByCollegeId,
  getDocumentsByUserId,
  updateDocumentById,
  deleteDocumentById,
};
