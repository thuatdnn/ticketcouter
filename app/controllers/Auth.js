const { validationResult } = require('express-validator/check');
const Responses = require('../responses');
const UserRepository = require('../repositories/Auth');
const JWT = require('jsonwebtoken')
class AuthCtrl extends Responses{
    constructor(){
        super();
        this.userRepo = new UserRepository;  
    };

    async register(req, res){
        let options = {};

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            let options = {
                validations: []
            };
            errors.array().forEach((obj)=>{
                options.validations.push({'attribute': obj.param,'reason': obj.msg});
            });
            return this.validation_error(res, options);
        }
        else {
            const user = await this.userRepo.getUserByUsername(req.body.username);
            if (!user){
                this.userRepo.register(req.body);
                return this.success(res, options);
            }
            else{
                return this.username_exist(res, options)
                }
            }
        }

        async login (req, res){
            let options = {};
            let errors = validationResult(req);

            if (!errors.isEmpty()){
                let options = {
                    validations: []
                };
                errors.array().forEach((obj)=>{
                    options.validations.push({'attribute': obj.param,'reason': obj.msg});
                });
                return this.validation_error(res, options);
            }
            else{
                const user = await this.userRepo.getUserByUsername(req.body.username);
                if (!user){
                    return this.not_matched(res, options)
                }else{
                    const checkPass = await user.isValidPassword(req.body.password)
                    if (!checkPass){
                        return this.not_matched(res, options)
                    }else{
                        const token = JWT.sign({'id': user.id, 'admin': user.admin}, APP_KEY);
                        let options = {
                            data:{
                                token: token
                            }
                        }
                        return this.success(res, options);
                    }
                }
            } 
        }
    }

module.exports = AuthCtrl;