const AWS = require('aws-sdk');
const config = require('config');

var AWSconfig = config.get('AWS');

AWS.config.update({
  accessKeyId: AWSconfig.s3.accessKeyId,
  secretAccessKey: AWSconfig.s3.secretAccessKey
});

module.exports.s3 = new AWS.S3();
