const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));

// const tempPage = require('../helpers/tempPage.html');

var google = require('googleapis');
var googleAuth = require('google-auth-library');

var config = require('config')['passport'];

var globalOauth2Client;
var globalCommenDates;


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
      console.log(err);
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
      console.log(error);
      res.status(503).send(error);
    });

};

module.exports.deleteMultipleAvailabilityById = (req, res) => {

  knex('availability').whereIn('id', req.body.ids).delete()
    .then((destroyed) => {
      console.log('destroyed: ', destroyed);
      res.send(req.body.ids);
    })
    .catch((error) => {
      console.log(error);
      res.status(503).send(error);
    });
};

module.exports.syncToGoogleCalendar = (req, res) => {

  var clientSecret = config.Google.clientSecret;
  var clientId = config.Google.clientID;
  var redirectUrl = 'http://localhost:3000/availability/google/callback';
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  var SCOPES = ['https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/plus.me'];
  
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  globalOauth2Client = oauth2Client;
  globalCommenDates = req.body.commonDates;

  res.status(201).send(authUrl);

};

module.exports.redirectToTempPage = (req, res) => {

  var path = require('path');

  res.sendFile(path.resolve(__dirname, '../helpers/tempPage.html'));

};

module.exports.addEventsToGoogleCalendar = (req, res) => {

  var authCode = req.body.auth;

  globalOauth2Client.getToken(authCode, (err, token) => {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }

  globalOauth2Client.credentials = token;

  addEvents(globalOauth2Client);
    
  })

};


function addEvents(auth) {
  var calendar = google.calendar('v3');

  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: globalCommenDates,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}