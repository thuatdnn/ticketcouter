const UserRepository = require('./app/repositories/User');
const userRepo = new UserRepository;
module.exports = {
    seeder: async function(){
        let result = await userRepo.getUserByUsername("BE.admin");
        if (!result){
            let defaultAdmin = {
                    "username": "BE.admin",
                    "password": "bapcodewar",
                    "admin": true
            }
            await userRepo.register(defaultAdmin);
        }
    }
}