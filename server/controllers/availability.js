const models = require('../../db/models');

module.exports.getAvailabilityByTripId = (req, res) => {

  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length - 1];
  
  //how to attach username in here from profile page as well?
  models.Availability.where('trip_id', tripId).fetchAll()
    .then(availabilities => {
      
      availabilities = availabilities.models.map((avail)=>{

        return avail.attributes;
      });
      res.status(200).send(availabilities);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
  
};

//createAvailabilityByTripId

module.exports.createAvailabilityByTripId = (req, res) => {

  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length - 1];

  models.Availability.forge({
    user_id: req.session.passport.user,
    trip_id: tripId,
    rangeStart: req.body.start,
    rangeEnd: req.body.end
  }).save()
    .then(availabilities => {
      res.status(201).send(availabilities.attributes);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      console.log(err);
      res.status(503).send(err);
    });
  
};

//delete entry if clicked Twice
module.exports.deleteAvailabilityById = (req, res) => {

  models.Availability.where({'id': req.body.id}).destroy()
    .then((destroyed) => {
      res.send(destroyed);
    })
    .catch((error) => {
      console.log(err);
      res.status(503).send(error);
    });

};