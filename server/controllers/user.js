const models = require('../../db/models');


module.exports.getUserById = (req, res) =>{
  
  res.status(200).send(req.user);


};

module.exports.getUsersByTripId = (req, res) => {
  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length-1];
  console.log('TRIP ID FOR ALL USERS', tripId);

  models.Confirmed.where('trip_id', tripId).fetchAll()
    .then((confirms) => {
      confirms = confirms.models.map(cf=>{return cf.attributes;});
      var emails = confirms.map((cf)=>{
        return cf.email;
      });
      console.log('-----------------',emails);
      models.Profile.where('email', 'IN', emails).fetchAll()
        .then(users => {
          users = users.models.map(user=>{return user.attributes;});
          res.status(200).send(users);
        })
        .catch((err) => {
          res.status(503).send(err);
        });
    })
    .catch((err) => {
      res.status(503).send(err);
    });


  
};
