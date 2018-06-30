const UserModel = require('../models/User');


class UserRepository{
    constructor(){
    };
    register (body) {
        try {
            let newUser = new UserModel(body);
            newUser.save()
        }catch (e) {
            console.log(e)
        }
    }

    async getUserByUsername(username) {
        try{
             let user =   await UserModel.findOne({'username': username});
             return user
        }catch(e){
            console.log(e);
        }
    }
}
module.exports = UserRepository