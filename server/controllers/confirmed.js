const models = require('../../db/models');

module.exports.getConfirmsByTripId = (req, res) => {
  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length - 1];

  models.Confirmed.where('trip_id', tripId).fetchAll()
    .then((confirms) => {
      confirms = confirms.models.map(cf=>{ return cf.attributes; });
      res.status(200).send(confirms);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};

module.exports.updateUserConfirmationForTrip = (req, res) => {

  models.Confirmed.where({ 'trip_id': req.body.trip.id, 'email': req.body.user.email }).fetch()
    .then((update) => {
      let status = update.get('confirmed');
      let newStatus = !status;
      update.set({
        'confirmed': newStatus,
        'user_id': req.body.user.id
      }).save()
        .then((model) => {
          res.status(200).send(model.get('confirmed'));
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send(err);
    });

};
