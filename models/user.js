const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true, required: true},
  username: {type: String, lowercase: true, require: true},
  password: String
});

// hook that runs before the model gets saved
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {return next(err); }
      user.password = hash;
      return next(user);
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {return cb(err); }
    cb(null, isMatch);
  });
}
const USER = mongoose.model('user', userSchema);
module.exports = USER;
