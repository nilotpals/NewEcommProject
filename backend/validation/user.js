const { check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
    check('fullname')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required!')
      .isString()
      .withMessage('Must be a valid name!'),
    check('email')
    .trim()
      .not()
      .isEmpty()
      .withMessage('Email is required!')
    .normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password is empty!')
      .isLength({ min: 6, max: 40 })
      .withMessage('Password must be 6 to 40 characters long!'),
  ];