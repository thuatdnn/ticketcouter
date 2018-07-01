const { body, header } = require('express-validator/check');
const validator = require('validator')
module.exports =[
    header('Authentication').exists().withMessage('required'),
    body('quantity').isInt({gt:0}).withMessage('positive_integer_required'),
    body('card_type').isIn(['visa']).withMessage("unsupported_card_type"),
    body('card_number').isCreditCard().withMessage("wrong_card_number_format"),
    body('card_expiration').exists().withMessage('required'),
    body('cvc_code').exists().withMessage('required')
]