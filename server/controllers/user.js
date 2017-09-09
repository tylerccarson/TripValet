const models = require('../../db/models');


module.exports.getUserById = (req, res) =>{
  
  res.status(200).send(req.user);


};
