var sendInviteEmail = function(inviterName, tripName, invitees) {
  
  var api_key = 'key-ed15d9b7166f3bbab71cec2127e6b019';
  var domain = 'mg.tripvalet.me';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


  var mailOptions = {
    from: 'Trip Valet <postmaster@mg.tripvalet.me>',
    to: invitees,
    subject: `${inviterName} has invited you to ${tripName} on TripValet!`,
    html: `
            <p>This is an automatically generated email, please do not reply.</p>
            <p> ${inviterName} has invited you to ${tripName}!</p>
            <br />
            <a href = https://tripvalet.herokuapp.com/ >Go to TripValet for more details.</a>
            <br />
            
            <p>If you have any further questions, please email weiyilee17@tripvalet.me</p>
          `
          
  };

  mailgun.messages().send(mailOptions, function(error, response) {
    if (error) {
      console.log('error happened sending mail: ', error);
      //return false
      //res.end('error');
    } else {
      console.log('message sent ' + response);
      console.log(response);
      // res.end('sent');
      //return true
    }
  });
};

module.exports.sendInviteEmail = sendInviteEmail;