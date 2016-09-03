const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  //iat = issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({error: 'Email and Password Must Be Provided'});
  }
  User.findOne({email: email}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(422).send({error: 'Email Already In Use'});
    }
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    newUser.save((err) => {
      if (err) {
        return next(err);
      }
      res.json({token: tokenForUser(newUser)});
    });
  })
}

exports.signin = function(req, res, next) {
  res.send({token: tokenForUser(req.user)});
}
