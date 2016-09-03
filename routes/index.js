var express = require('express');
var router = express.Router();

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}); //token based, not session
const requireSignin = passport.authenticate('local', {session: false});

// module.exports = function(app) {
router.get('*', (req, res) => {
  res.render('index');
})
router.get('/api/', requireAuth, (req, res) => {
  res.send({message: 'secret code is readysetgo'});
});
router.post('/api/signup', Authentication.signup);
router.post('/api/signin', requireSignin, Authentication.signin);
// }
module.exports = router;
