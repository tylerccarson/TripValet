const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Trip.fetchAll()
    .then(trips =>{
      
      trips = trips.models.map(trip=>{return trip.attributes;});
      res.status(200).send(trips);
    })
    .catch(err => {
      console.log(err);
      res.status(503).send(err);
    });
};

module.exports.getTripsByUserEmail = (req, res ) => { // this is used when we want to fetch all trips by a user on dashboard.
  var email = { email: req.body.email }; // this may change depending on actual request form.
  models.Confirmed.where(email).fetchAll()
    .then((confirms)=>{
      var tripIds = confirms.models.map((confirm)=>{
        return confirm.attributes.trip_id;
      });
      return models.Trip.where('id', 'IN', tripIds).fetchAll();
    })
    .then((trips)=>{
      res.status(200).send(trips);
    })
    .catch((err)=>{
      res.status(503).send(err);
    });

};

module.exports.createTrip = (req, res) => {
  models.Trip.forge({
    tripname: req.body.tripname,
    description: req.body.description,
    location: req.body.location,
    rangeStart: req.body.rangeStart,
    rangeEnd: req.body.rangeEnd,
    user_id: req.body.user_id

  }).save()
    .then(trip => {
      res.status(201).send(trip.attributes);
    })
    .catch(err => {
      res.status(503).send(err);
    });

};

/* Keys for trips contain
  id
  tripname
  description
  location
  creator mail
*/

