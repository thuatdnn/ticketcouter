const { body, header } = require('express-validator/check');
const validator = require('validator')
module.exports =[
    header('Authorization').trim().not().isEmpty().withMessage('required'),
    body('name').trim().not().isEmpty().withMessage('required'),
    body('banner').trim().not().isEmpty().withMessage('required'),
    body('ticket_total').isInt({gt:-1}).withMessage('positive_integer_required'),
    body('ticket_price').isFloat({gt: -1}).withMessage('positive_number_required'),
    //body('start_date').isISO8601().withMessage('required'),
    body('start_date').custom((value, {req}) => {
        if (!value){
            throw new Error('required')
        }
        let checkISO = validator.isISO8601(value);
        if (!(checkISO)){
            throw new Error('required')
        }else{
            if (validator.isAfter(value, req.body.end_date)){
                throw new Error('start_date_invalid')
            }else{
                return true
            }
        }
    }),
    body('end_date').isISO8601().withMessage('end_date_invalid'),
    body('ticket_start_date').custom((value, {req}) => {
        if (!value){
            throw new Error('required')
        }
        let checkISO = validator.isISO8601(value);
        if (!checkISO){
            throw new Error('required')
        }
        if (validator.isAfter(value, req.body.ticket_end_date)||validator.isAfter(value, req.body.start_date)){
                throw new Error('ticket_start_date_invalid')
        }else{
                return true
        }
    }),
    //body('ticket_start_date').isISO8601().withMessage('required'),
    body('ticket_end_date').isISO8601().withMessage('ticket_end_date_invalid'),
]