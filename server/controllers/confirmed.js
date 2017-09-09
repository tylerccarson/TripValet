const models = require('../../db/models');

// functions to be created.
module.exports.getConfirmsByTripId = (req, res) => {
  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length - 1];

  models.Confirmed.where('trip_id', tripId).fetchAll()
    .then((confirms) => {
      confirms = confirms.models.map(cf=>{ return cf.attributes; });
      console.log(confirms);
      res.status(200).send(confirms);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};


//getByTripId