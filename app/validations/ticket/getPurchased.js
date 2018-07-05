const { body, header } = require('express-validator/check');
const validator = require('validator')
module.exports =[
    header('Authorization').trim().not().isEmpty().withMessage('required')
]