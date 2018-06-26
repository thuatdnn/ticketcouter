const UserModel = require('../models/user');
module.exports = {
    createUser:(req, res, next)=>{
        let user = new UserModel({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            familyname: req.body.familyname
        })
       user.save((err)=>{
            if (err){
                console.error(err)
            }
            else
                console.log("User created!");
       })
    }
}