const db = require('../models');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const utils = require('../utiles/insertIntoRedis');

require('dotenv').config();

exports.addNewUser = async(email,password) => {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password,saltRounds);

    return await db.UserTable.create({ email, password:hashedPassword });
        
}

exports.loginVerification = async(email, password ) => {
    
    const userResult = await db.UserTable.findOne({ where: { email } });
    if(userResult){
        
        const passwordMatch = await bcrypt.compare(password,userResult.password);
        
        if(passwordMatch){
            const token = jwt.sign({ email }, process.env.JWT_SECRET,{ expiresIn: '1D' });
            
            const redisToken = await utils.insertIntoRedis(token,email);
            // console.log(redisToken);
            return {token:token,success:true};
           
        }
    }
    return false;
}
exports.verifyTokenService = async(token) => {
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        const user = await db.UserTable.findOne({ where: { email: decoded.email } });
        if(user){
            return true;
        }
        return false; 
}