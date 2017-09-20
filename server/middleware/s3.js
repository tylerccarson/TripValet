const AWS = require('aws-sdk');
const config = require('config');
// var AWSconfig = config.get('AWS');
AWS.config.update({
  accessKeyId: 'AKIAJIQTIM2S4JSNCR4Q',
  secretAccessKey: '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'
});

module.exports.s3 = new AWS.S3();

// var AWSconfig = {
//   "s3": {
//     "accessKeyId": "AKIAJIQTIM2S4JSNCR4Q",
//     "secretAccessKey": "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"
//   }
// }
var AWSconfig = {
  "s3": {
    "accessKeyId": "AKIAJIQTIM2S4JSNCR4Q",
    "secretAccessKey": "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"
  }
};
// };

// AWS.config.update({
//   "accessKeyId": AWSconfig.s3.accessKeyId,
//   "secretAccessKey": AWSconfig.s3.secretAccessKey
// });
