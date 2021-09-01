const { body } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');



exports.register = [
        
    body('username', 'Username should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 } )
    .custom(value => {
        return User.findOne({username: value}).then(user => {
          if (user) {
            return Promise.reject('Username already exists!');
          }
        });
    }),

    body('password', 'Password should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 } )
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.repeatPassword) {
            throw new Error("Passwords don't match!");
        } else {
            return value;
        }
    }),
];



exports.login = [
        
    body('username', 'Username should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5, max: 22 } )
    .custom(value => {
        return User.findOne({username: value}).then(user => {
          if (!user) {
            return Promise.reject('Username does not exist');
          }
        });
    }),

    body('password', 'Password should be at least 5 characters long consisting of only english letters and digits.')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .isLength( { min: 5 , max: 22 } ),
    
];



exports.create = [
        
  body('title', 'Title must be at least 4 characters or more and only consist of letters, numbers, and spaces')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d\s]+/)
  .isLength( { min: 4, max: 150} )
  .custom(value => {
    return Course.findOne({title: value}).then(course => {
      if (course) {
        return Promise.reject('Course name already exists!');
      }
    });
}),
  
  body('description', 'Description must be at least 20 characters long.')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d,;'\"\s.!?]+/)
  .isLength( { min: 20 } ),

  body('imageUrl', 'Invalid image URL! Only accepts valid image URLs starting with http or https')
  .trim()
  .notEmpty()
  .isURL()
];



exports.edit = [
        
  body('title', 'Title must be 4 characters or more and only consist of letters, numbers, and spaces')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d\s]+/)
  .isLength( { min: 4, max: 150} ),
  
  body('description', 'Description must be at least 20 characters long.')
  .trim()
  .notEmpty()
  .matches(/[A-Za-z\d,;'\"\s.!?]+/)
  .isLength( { min: 20 } ),

  body('imageUrl', 'Invalid image URL! Only accepts valid image URLs starting with http or https')
  .trim()
  .notEmpty()
  .isURL()
];