const { body, header } = require('express-validator/check');

module.exports =[
    header('Authentication').exists().withMessage('required'),
    body('name').exists().withMessage('required'),
    body('banner').exists().withMessage('required'),
    body('ticket_total').isInt({gt:-1}).withMessage('positive_integer_required'),
    body('ticket_price').isNumeric({gt:-1}).withMessage('positive_number_required'),
    body('start_date').isISO8601().withMessage('required'),
    
]