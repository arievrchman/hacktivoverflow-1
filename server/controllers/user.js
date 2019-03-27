const User = require('../models/user');
const jwt = require('jsonwebtoken');
const compare = require('../helpers/bcrypt').compare;
const kue = require('kue');
const queue = kue.createQueue();

module.exports = {
  async register(req, res) {
    try {
      let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      };
      let user = await User.create(newUser);
      let emailJob = queue.create('email', {
        title: `Welcome to Vuefervlow`,
        email: user.email,
        template: `<h1> Welcome ${user.name}, Thanks for Register to our website!</h1><br>
                   <a href="vueverflow.arievrchman.xyz/users/login">Login here</a>`
      })
      emailJob.save(err => {
        if (err) {
          console.log(err);
        } else {
          console.log('sending email');
        }
      });
      res.status(201).json({
        user,
        message: 'You have successfully registered'
      });
    } catch ({ errors }) {
      let errorMessage = {};
      for (const key in errors) {
        errorMessage[key] = errors[key].message;
      }
      res.status(400).json(errorMessage);
    };
  },
  async login(req, res) {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let verified = compare(req.body.password, user.password);
        if (verified) {
          let payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          };
          let token = jwt.sign(payload, process.env.SECRET);
          res.json({ token, message: 'You have successfully logged in' });
        } else {
          res.status(404).json({ message: 'Please provide a valid email and password' });
        };
      } else {
        res.status(404).json({ message: 'Please provide a valid email and password' });
      };
    } catch (error) {
      res.status(500).json(error);
    };
  },
  async isLogin(req, res) {
    try {
      let user = await User.findById(req.auth_user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

