const models = require('../../db/models');


module.exports.add = (req, res) => {

  models.Schedules.forge({
    trip_id: req.body.tripId,
    day: req.body.day,
    title: req.body.schedule.name,
    url: req.body.schedule.url,
    fs_id: req.body.schedule.id
  }).save()
    .then((schedule)=>{
      res.status(201).send(schedule);
    })
    .catch((err)=>{
      console.log('Error saving schedule: ', err);
      res.status(500).send(err);
    });

};

module.exports.get = (req, res) =>{

  var incomingUrl = req.headers.referer;
  incomingUrl = incomingUrl.split('/');
  var tripId = incomingUrl[incomingUrl.length - 1];

  models.Schedules.where({
    trip_id: tripId,
  }).orderBy('day', 'ASC').fetchAll()
    .then((schedules)=>{
      res.status(200).send(schedules);
    })
    .catch((err)=>{
      console.log('Error fetching schedules: ', err);
      res.status(500).send(err);
    });

};

module.exports.remove = (req, res) =>{

  models.Schedules.where({'id': req.body.todo.id}).destroy()
    .then((destroyed) => {
      res.status(201).send(destroyed);
    })
    .catch((error) => {
      console.log('ERROR DELETING: ', error);
      res.status(503).send(error);
    });
};
