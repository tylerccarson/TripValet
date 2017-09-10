const models = require('../../db/models');

module.exports.getAvailabilityByTripId = (req, res) => {

  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length - 1];
  
  models.Availability.where('trip_id', tripId).fetchAll()
    .then(availabilities => {
      
      availabilities = availabilities.models.map((avail)=>{

        return avail.attributes;
      });
      console.log('AVAIL--------------', availabilities);
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
  console.log('Availability received!');

  return models.Availability.forge({
    user_id: req.session.passport.user,
    trip_id: tripId,
    rangeStart: req.body.rangeStart,
    rangeEnd: req.body.rangeEnd
  }).save()
    .then(availabilities => {
      console.log(req.body);
      availabilities = availabilities.models.map((avail)=>{
        return avail.attributes;
      });
      console.log('AVAIL---CREATE--------------', availabilities);
      res.status(201).send(availabilities);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
  
};