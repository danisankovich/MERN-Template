var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var User = require('../models/user');
var config = require('../config');

/* GET users listing. */

const authenticate = expressJwt({secret : config.secret});

router.get('/me', function(req, res) {
  console.log(req.headers)
  try {
   var token = req.headers.authorization.replace('Bearer ', '');
   console.log(token)
   var decoded = jwt.decode(token, config.secret);
   console.log(decoded)
   } catch (e) {
     return res.status(401).send('authorization required');
   }
  res.status(200).json(req.user);
});

router.get('/currentUser', function(req, res, next) {
  console.log(req);
  res.send('respond with a resource');
});

module.exports = router;
