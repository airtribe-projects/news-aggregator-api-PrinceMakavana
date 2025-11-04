require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = process.env.SALT_ROUNDS;

const usersModel = require('../models/usersModel.js');

const registerUser = async (user) => {
    const startTime = Date.now();
    // Add validation for required fields
    if (!user.name || !user.email || !user.password) {
        throw new Error("Name, Email and Password are required");
    }
    user.password = bcrypt.hashSync(user.password, 10);

    const dbUser = await usersModel.create(user);
    dbUser.password = "";
    return dbUser;
}
const loginUser = async (email, password) => {
    const dbUser = await usersModel.findOne({email});
    
    if (!dbUser) {
        throw new Error("User not found");
    }
  const isSamePassword = await bcrypt.compare(password, dbUser.password);


    if (!isSamePassword) {
        throw new Error("Invalid Password");
    }
    
    return dbUser;
}
const getUserById = async (id) => { 
    const dbUser = await usersModel.findById(id);
    if (!dbUser) {
        throw new Error("User not found");
    }
    return dbUser;
}



module.exports = {registerUser , loginUser , getUserById};
