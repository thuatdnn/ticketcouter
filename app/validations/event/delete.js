const { body, header } = require('express-validator/check');
const validator = require('validator')
module.exports =[
    header('Authentication').exists().withMessage('required')
]