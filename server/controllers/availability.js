const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));

// const tempPage = require('../helpers/tempPage.html');

var google = require('googleapis');
var googleAuth = require('google-auth-library');

var config = require('config')['passport'];

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
  // console.log('req.body.commonDates:', req.body.commonDates);

  var clientSecret = config.Google.clientSecret;
  var clientId = config.Google.clientID;

  // currently redirecting to home page, we can redirect back to the original page
  // in the future
  // var redirectUrl = config.Google.callbackURL;
  var redirectUrl = 'http://localhost:3000/availability/google/callback';

  console.log('client secret:', clientSecret);
  console.log('client id: ', clientId);
  console.log('redirectUrl: ', redirectUrl);

  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  var SCOPES = ['https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/plus.login'];
  
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('authUrl: ', authUrl);

  res.status(201).send(authUrl);

};

module.exports.setGoogleCalendar = (req, res) => {

  var path = require('path');

  res.sendFile(path.resolve(__dirname, '../helpers/tempPage.html'));

};


function addEvents(auth) {
  var calendar = google.calendar('v3');
  
  var event = {
    'summary': 'Test Insert Event',
    'location': '944 Market Street, 8th floor, San Francisco, CA 94102',
    'description': 'Test descriptions.',
    'start': {
      'dateTime': '2017-09-18T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2017-09-20T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    // 'recurrence': [
    //   'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    // 'attendees': [
    //   {'email': 'iloverpg9@gmail.com'},
    // ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  calendar.events.insert({
    // auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}