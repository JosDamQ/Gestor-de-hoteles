'use strict'

const bcrypt = require('bcrypt');

exports.validateData = (data)=>{
    let keys = Object.key(data), msg = ''
    for(let key of keys){
        if(data[key] !== null &&
           data[key] !== undefined &&
           data[key] !== '') continue;
        msg += `The patams ${key} is required\n`
    }
    return msg.trim();
}

exports.encrypt = async(password)=>{
    try{
        return bcrypt.hashSync(password, 10)
    }catch(err){
        console.error(err);
        return err;
    }   
}

exports.checkPassword = async(password, hash)=>{
    try{
        return await bcrypt.compare(password, hash)
    }catch(err){
        console.error(err);
        return false;
    }
}

exports.chechUpdate = 
(data, isUser)=>{
    try{
        if(isUser){
            if(data.password.length =='' ||
            data.password || 
                Object.entries(data).length === 0 ||
                data.role
            ){
                    return false; 
            }
            return true;
        }else{
            if(Object.entries(data).length ===0 || data.user){
                return false;
            }
            return true;
        }
    }catch(err){
        console.error(err);
        return err;
    }
}

exports.deleteSensitiveData = (user)=>{
    try{
        delete user.password;
        delete user.role;
        delete user.username;
    }catch(err){
        console.error(err);
        return err;
    }
}
