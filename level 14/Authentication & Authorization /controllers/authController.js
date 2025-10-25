const { check, validationResult } = require('express-validator');

exports.getSignup = (req, res, next) => {
  res.render('signup', {
    pageTitle: 'signup',
    currentPage: 'signup',
    isLoggedIn: false,
    errors: [],
    oldInput: {firstname: '', lastname: '', email: '', password: '', confirmPassword: '', usertype: '', terms: ''}
  });
};

exports.postSignup = [
  // First Name validation
  check('firstname') // fixed typo from 'firtname'
    .trim()
    .isLength({ min: 3 }) // fixed typo 'isLenghth' -> 'isLength'
    .withMessage('First name must be at least 3 characters long.')
    .matches(/^[A-Za-z]+$/) // fixed typo 'mathes' -> 'matches'
    .withMessage('First name must contain only letters.'),

  // Last Name validation
  check('lastname')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long.')
    .matches(/^[A-Za-z]+$/)
    .withMessage('Last name must contain only letters.'),

  // Email validation
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  // Password validation
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number.')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character.')
    .trim(),

  // Confirm Password validation
  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),

  // User Type validation
  check('usertype')
    .notEmpty()
    .withMessage('User type is required.')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type.'),

  // Terms & Conditions validation
  check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and conditions.')
    .custom((value, { req }) => { 
      if (value !== 'on') {
        throw new Error('You must accept the terms and conditions.');
      }
      return true;
    }),

  // Final handler
  (req, res, next) => {
    const { firstname, lastname, email, password, usertype, } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('signup', {
        pageTitle: 'signup',
        isLoggedIn: false,
        currentPage: 'signup',
        
        errors: errors.array().map(error => error.msg),
        oldInput: { firstname, lastname, email, password, usertype,  }
      });
    }

    console.log(req.body);
    // req.session.isLoggedIn = true; // Uncomment if you want to auto-login
    res.redirect('/login');
  }
];

exports.getLogin = (req, res, next) => {
  res.render('login', {
    pageTitle: 'login',
    currentPage: 'login',
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};