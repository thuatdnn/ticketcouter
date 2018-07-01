const { body, header } = require('express-validator/check');

module.exports =[
    header('Authentication').exists().withMessage('required'),
    body('name').exists().withMessage('required'),
    body('banner').exists().withMessage('required'),
    body('ticket_total').isInt({gt:-1}).withMessage('positive_integer_required'),
    body('ticket_price').isNumeric({gt: -1}).withMessage('positive_number_required'),
    body('start_date').isISO8601().withMessage('required'),
    //body('start_date').isBefore(body('end_date')).withMessage('start_date_invalid'),
    body('end_date').isISO8601().withMessage('required'),
    body('ticket_start_date').isISO8601().withMessage('required'),
    //body('ticket_start_date').isBefore(body('ticket_end_date')).withMessage('ticket_start_date_invalid'),
    body('ticket_end_date').isISO8601().withMessage('required'),
]