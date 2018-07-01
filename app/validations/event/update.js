const { body, header } = require('express-validator/check');
const validator = require('validator')
module.exports =[
    header('Authentication').exists().withMessage('required'),
    body('name').exists().withMessage('required'),
    body('banner').exists().withMessage('required'),
    body('ticket_total').isInt({gt:-1}).withMessage('positive_integer_required'),
    body('ticket_price').isNumeric({gt: -1}).withMessage('positive_number_required'),
    body('start_date').isISO8601().withMessage('required'),
    /*body('start_date').custom((value, {req}) => {
        let checkISO = validator.isISO8601(value);
        if (!checkISO){
            throw new Error('required')
        }else{
            if (validator.isAfter(value, req.body.end_date)){
                throw new Error('start_date_invalid')
            }else{
                return true
            }
        }
    }),
    */
    body('end_date').isISO8601().withMessage('required'),
    /*body('ticket_start_date').custom((value, {req}) => {
        let checkISO = validator.isISO8601(value);
        if (!checkISO){
            throw new Error('required')
        }
        if (validator.isAfter(value, req.body.ticket_end_date)){
                throw new Error('ticket_start_date_invalid')
        }else{
                return true
        }
    }),
    */
   body('ticket_start_date').isISO8601().withMessage('required'),
    body('ticket_end_date').isISO8601().withMessage('required'),
]