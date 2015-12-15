var mongoose = require('mongoose');
var bcyrpt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    second: {
      type: String,
      required: true
    },
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

 title: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },

  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcyrpt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});


// Method to compare the compare password with the database password
UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcyrpt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);

