const { s3 } = require("../config/aws");

function getPresignedUrl(bucketName, key, expires = 300) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: expires, // URL valid for 300 seconds (5 mins)
  };
  return s3.getSignedUrl("getObject", params);
}

module.exports = { getPresignedUrl };
