const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect!');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then(hashedPw => {
      User.create({
        email: email,
        name: name,
        password: hashedPw,
        status: 'I am new!'
      })
        .then(result => {
          res.status(201).json({
            message: 'User created successfully!',
            user: result
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      }, 'supersecretstring', { expiresIn: '1h' });
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}