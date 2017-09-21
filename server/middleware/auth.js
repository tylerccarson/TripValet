const session = require('express-session');
const RedisStore = require('connect-redis')(session);
var redisClient;

if (process.env.NODE_ENV === 'production') {
  redisClient = require('redis').createClient(process.env.REDIS_URL);
} else {
  redisClient = require('redis').createClient();
}

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
