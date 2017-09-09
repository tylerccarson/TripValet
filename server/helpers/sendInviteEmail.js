function sendInviteEmail(inviterName, tripName, invitees) {
  
  var api_key = 'key-ed15d9b7166f3bbab71cec2127e6b019';
  var domain = 'mg.tripvalet.me';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


  var mailOptions = {
    from: 'Trip Valet <postmaster@mg.tripvalet.me>',
    to: invitees,
    subject: `${inviterName} has invited you to ${tripName} on TripValet!`,
    html: `
            <p>This is a automatically generate email, please do not reply.</p>
            <p> ${inviterName} has invided you to ${tripName}!</p>
            <br />
            <a href = https://tripvalet.herokuapp.com/ >Go to TripValet to see more details</a>
            <br />
            
            <p>If you have any further questions, please email weiyilee17@tripvalet.me</p>
          `
          
  };

  mailgun.messages().send(mailOptions, function(error, response) {
    if (error) {
      console.log('error happened sending mail: ', error);
      res.end('error');
    } else {
      console.log('message sent ' + response);
      console.log(response);
      // res.end('sent');
    }
  });
}

module.exports.sendInviteEmail = sendInviteEmail;