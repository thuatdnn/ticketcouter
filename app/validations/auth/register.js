const { body } = require('express-validator/check');

module.exports = [
    body('username').trim().not().isEmpty().withMessage('required'),
    body('password').trim().not().isEmpty().withMessage('required')
];