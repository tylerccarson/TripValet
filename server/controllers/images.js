const s3 = require('../middleware/s3').s3;
const models = require('../../db/models');
var multer = require('multer');

module.exports.save = (req, res) => {
  var filename = req.files[0].originalname;
  var mimetype = req.files[0].mimetype;
  var region = 'us-west-1';
  var bucket = 'tripvalet';
  var key = Date.now().toString() + '_';
  var user_id = parseInt(req.body.user_id);
  var trip_id = parseInt(req.body.trip_id);
  // // var awsLink = `https://s3-${region}.amazonaws.com/localized-0001/${key}`;
  var params = {
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    Body: req.files[0].buffer,
    ContentType: req.files[0].mimetype
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log('s3 upload controller error:', err);
      res.end();
    } else {
      models.Images.forge({
        user_id: user_id,
        trip_id: trip_id,
        url: data.Location,
        poster: req.body.poster,
      }).save()
        .then(image => {
          res.status(201).send(image.attributes);
        })
        .catch(err => {
          console.log(err);
          res.status(503).send(err);
        });
      console.log(`Uploaded ${filename} to ${bucket}. URL ===`, data.Location);
    }
  });
};
