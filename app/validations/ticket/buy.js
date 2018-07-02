const { body, header } = require('express-validator/check');
const validator = require('validator')
module.exports =[
    header('Authentication').exists().withMessage('required'),
    body('quantity').isInt({gt:0}).withMessage('positive_integer_required'),
    body('card_type').isIn(['visa']).withMessage("unsupported_card_type"),
    body('card_number').custom((value)=>{
        let checkExist = validator.isEmpty(value);
        if (checkExist){
            throw new Error('required')
        }else{
            if (!validator.isCreditCard(value)){
                throw new Error('wrong_card_number_format')
            }
            else
                return true
        }
    }),
    body('card_expiration').custom((value)=>{
        let checkExist = validator.isEmpty(value);
        if (checkExist){
            throw new Error('required')
        }else{
            let rexexp = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
            let checkExpiration = rexexp.test(value)
            if (!checkExpiration){
                throw new Error('wrong_card_expiration')
            }
            else
                return true
        }
    }),
    body('cvc_code').custom((value)=>{
        let checkExist = validator.isEmpty(value);
        if (checkExist){
            throw new Error('required')
        }else{
            let rexexp = /^([0-9]{3})$/;
            let checkCVC = rexexp.test(value)
            if (!checkCVC){
                throw new Error('invalid_cvc')
            }
            else
                return true
        }
    })
    
]