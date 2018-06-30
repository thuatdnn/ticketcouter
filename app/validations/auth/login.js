const { body } = require('express-validator/check');

module.exports = [
    body('username').exists().withMessage('required'),
    body('password').exists().withMessage('required')
];