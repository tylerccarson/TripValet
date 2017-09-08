const models = require('../../db/models');

//1 get all messages for a trip
module.exports.getMessagesByTripId = (req, res) => {
  var tripId = req.query.tripId;
  //gonna need to fix this query so username gets attached for each message
  models.Messages.where('trip_id', tripId).fetchAll()
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};

//2 create a new message for a trip
module.exports.createMessage = (req, res) => {
  models.Messages.forge({
    //how to get id instead of actual name? will they be accessible from client?
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

//3 delete a message by id