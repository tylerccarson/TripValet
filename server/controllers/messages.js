const models = require('../../db/models');

module.exports.getMessagesByTripId = (req, res) => {
  var tripId = req.query.tripId;
  console.log(req);
  models.Messages.where({'trip_id': tripId}).fetchAll()
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send(err);
    });
};

module.exports.createMessage = (req, res) => {
  models.Messages.forge({
    user_id: req.body.userId,
    user: req.body.user,
    trip_id: req.body.tripId,
    text: req.body.text
  }).save()
    .then(message => {
      res.status(201).send(message.attributes);
    })
    .catch(err => {
      console.log(err);
      res.status(503).send(err);
    });
};

module.exports.deleteMessage = (req, res) => {
  models.Messages.where({'id': req.body.messageId}).destroy()
    .then((destroyed) => {
      res.send(destroyed);
    })
    .catch((error) => {
      res.status(503).send(error);
    });
};