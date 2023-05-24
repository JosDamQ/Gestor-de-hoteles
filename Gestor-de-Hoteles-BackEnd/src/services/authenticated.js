'use strict'

//validar si el token es correcto (expiracion valides);

const jwt = require('jsonwebtoken');

//funcion midelweare
exports.ensureAuth = (req, res, next)=>{
    if (!req.headers.authorization){
        return res.status(403).send({message: `Doesn't contains headers "AUTORIZATION"`});
    }else{
        try{
            // obtener token
            let token = req.headers.authorization.replace(/['"]+/g, '')
            //decodificar el token
            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`)
            //validar que no halla expirado
            if(Math.floor(Date.now()/ 1000) >= payload.exp){
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
        if(user.rol !== 'ADMIN') return res.status(403).send({message: 'Unauthorized user'});
        next();
    }catch(err){
        console.error(err);
        return res.status(403).send({message: 'Unauthorized user'})
    }
}

exports.isWorker = async(req, res, next)=>{
    try{
        let user = req.user;
        if(user.rol !== 'WORKER') return res.status(403).send({message: 'Unauthorized user'});
        next();
    }catch(err){
        console.error(err);
        return res.status(403).send({message: 'Unauthorized user'})
    }
}