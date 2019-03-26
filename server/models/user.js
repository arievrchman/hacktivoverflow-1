const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../helpers/bcrypt').hash;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: {
      isAsync: true,
      validator(value) {
        return new Promise((resolve, reject) => {
          User.find({ email: value }, (err, res) => {
            if (res.length > 0) {
              reject(false);
            } else {
              resolve(true);
            }
          });
        });
      },
      message: 'Email already exists!'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'a password must be minimum 5 character.'],
    match: [/^(?=.*[0-9])(?=.*[a-zA-Z])/, 'a password should contain alphanumeric character.']
  },
});

userSchema.pre('save', function(next) {
  this.password = hash(this.password);
  next();
});

let User = mongoose.model('user', userSchema);

module.exports = User;