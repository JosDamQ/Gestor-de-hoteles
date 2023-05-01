'use strict'

//validar si el token es correcto (expiracion valides);

const jwt = require('jsonwebtoken');

//funcion midelweare
exports.ensureAuth = (req, res, next)=>{
    if (!req.header.autorization){
        return res.status(403).send({message: `Doesn't contains headers "AUTORIZATION"`});
    }else{
        try{
            // obtener token
            let token = req.headers.autorization.replace(/['"]+/g, '')
            //decodificar el token
            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`)
            //validar que no halla expirado
            if(payload.exp >= Date.now()){
                return res.status(401).send({message: 'Expired Token'});
            }
        }catch(err){
            console.error(err);
            return res.status(400).send({message: 'Invalid token'})
        }
        req.user = payload;
        next();
    }
}

exports.isAdmin = async(req, res, next)=>{
    try{
        let user = req.user;
        if(user.role != 'ADMIN') return res.status(403).send({message: 'Unauthorized user'});
        next();
        console.error(err);
        return res.status(403).send({message: 'Unauthorized user'})
    }catch(err){
        console.error(err);
        return res.status(403).send({message: 'Unauthorized user'})
    }
}