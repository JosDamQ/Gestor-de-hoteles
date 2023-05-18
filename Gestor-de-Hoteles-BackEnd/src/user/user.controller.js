'use strict'

const User = require('./user.model');
const { encrypt, validateData } = require('../utils/validate');
const { compare } = require('bcrypt');
const { createToken } = require('../services/jwt');

exports.test = (req, res) => {
  return res.status(201).send({ message: 'User test running' });
}

exports.createAdminDefault = async (req, res) => {
  try {
    let adminDefault = {
      name: 'User',
      surname: 'default',
      email: 'admin',
      password: 'admin',
      phone: '12021202',
      rol: 'ADMIN'
    }
    let user = await User.findOne({ email: 'admin' })
    if (user) return console.log('Admin already exists')
    adminDefault.password = await encrypt(adminDefault.password)
    let newAdmin = new User(adminDefault)
    await newAdmin.save()
    return console.log('Admin default was created')
  } catch (err) {
    return console.log(err);
  }
}
exports.login = async (req, res) => {
  try {
    let data = req.body
    let user = await User.findOne({ email: data.email });

    if (!data.password || data.password == ''|| !data.email || data.email == '') return res.status(500).send({ message: 'Params required' });
    if (user && await compare(data.password, user.password)) {
      // if (user.rol != 'ADMIN' && user.rol != 'WORKER')
      //   return res.status(500).send({ message: `You don't have permissions` })
      let token = await createToken(user)
      let userLogged = {
        name: user.name,
        username: user.username,
        rol: user.rol
      }
      return res.send({ message: 'User logged successfully', token, userLogged });
    }
    return res.status(404).send({ message: 'Invalid credentials' });
  } catch (err) {
    console.log(err);
  }
}

//Funcionalidades CLIENT

exports.register = async (req, res) => {
  try {
    let data = req.body
    if (!data.password || data.password == '' ||!data.name || data.name == '' || !data.surname || data.surname == '' ||
        !data.email || data.email == '' || !data.phone || data.phone == '') return res.status(404).send({message: 'Password is required'})
    let existUser = await User.findOne({email: data.email}); 
    if(existUser) return res.send({message: 'User Email already exist'})
    data.password = await encrypt(data.password)
    data.rol = 'CLIENT';
    let newUser = new User(data);
    await newUser.save()
    return res.status(201).send({ message: 'User saved successfully' });
  } catch (err) {
    console.log(err);
  }
}

// exports.createUser = async (req, res) => {
//   try {
//     let data = req.body
//     if (data.email || data.email == '') return res.send({ message: 'Email is not allowed' })
//     if (data.password || data.password == '') return res.send({ message: 'Password is not allowed' })
//     data.rol = 'CLIENT';
//     let newUser = new User(data);
//     await newUser.save()
//     return res.status(201).send({ message: 'User saved successfully' });
//   } catch (err) {
//     console.log(err);
//   }
// }

exports.getUsers = async (req, res) => {
  try {
    let users = await User.find({ rol: 'CLIENT' })
    return res.status(201).send({ users })
  } catch (err) {
    console.log(err);
  }
}

exports.getUser = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await User.findOne({ _id: userId, rol: 'CLIENT' });
    if (!user) return res.status(404).send({ message: 'User not found' });
    return res.status(201).send({ user })
  } catch (err) {
    console.log(err);
  }
}

//no puede actualizar la contrase;a pero que si quiere actuazliar que valide las contrase;as
exports.updateUser = async (req, res) => {
  try {
    let data = req.body;
    if (data.email || data.email == '') return res.send({ message: 'Email is not allowed' })
    if (data.password || data.password == '') return res.send({ message: 'Password is not allowed' })
    if (data.rol || data.rol == '') return res.send({ message: 'Rol is not allowed' })
    let params = {
      name: data.name,
      surname: data.surname,
      phone: data.phone
    }
    let msg = validateData(params)
    if (msg) return res.status(400).send({ msg })
    let userId = req.params.id;
    if(req.user.sub != userId) return res.status(403).send({message: 'You cant edit this user'})
    // let userId = req.user.sub
    // let user = await User.findOne({_id: userId.id})
    // if(!user) return res.status(400).send({message: ''})
    let userUpdated = await User.findOneAndUpdate({ _id: userId, rol: 'CLIENT' }, data, { new: true });
    if (!userUpdated) return res.status(404).send({ message: 'User not found' });
    return res.status(201).send({ userUpdated });
  } catch (err) {
    console.log(err);
  }
}

exports.updatePasswordUser = async (req, res) => {
  try {
    let userId = req.params.id
    let params = {
      before: req.body.before,
      after: req.body.after
    }
    let msg = validateData(params)
    if(req.user.sub != userId) return res.status(403).send({message: 'You cant update this user'})
    if (msg) return res.status(400).send({ msg });
    let user = await User.findOne({ _id: userId, rol: 'CLIENT' });
    if (!user) return res.status(404).send({ message: 'Client not found' });
    params.after = await encrypt(params.after)
    if (await compare(params.before, user.password)) {
      await User.findOneAndUpdate(
        { _id: workerId, rol: 'CLIENT' },
        { password: params.after },
        { new: true }
      )
      return res.status(201).send({ message: 'Password was updated' })
    }
    return res.send({ message: 'Invalid Password' });
  } catch (err) {
    console.log(err);
  }
}

exports.addWorker = async (req, res) => {
  try {
    let params = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      rol: 'WORKER'
    }
    // let msg = validateData(params)
    // if (msg) return res.status(400).send({ msg });
    let user = await User.findOne({ email: params.email, rol: 'WORKER' });
    if (user) return res.status(500).send({ message: 'User with this email already exists' });
    params.password = await encrypt(params.password)
    let newWorker = new User(params);
    await newWorker.save()
    return res.status(201).send({ message: 'Worker saved successfully' })
  } catch (err) {
    console.log(err);
  }
}

exports.getWorkers = async (req, res) => {
  try {
    let workers = await User.findOne({ rol: 'WORKER' }, { password: 0 }); // para que no traiga los datos param: 0
    return res.status(201).send({ workers })
  } catch (err) {
    console.log(err);
  }
}

exports.getWorker = async (req, res) => {
  try {
    let workerId = req.params.id;
    let worker = await User.findOne({ _id: workerId, rol: 'WORKER' }, { password: 0 });
    if (!worker) return res.status(201).send({ message: 'Worker not found' })
    return res.status(201).send({ worker })
  } catch (err) {
    console.log(err);
  }
}


exports.updatePasswordWorker = async (req, res) => {
  try {
    let workerId = req.params.id
    let params = {
      before: req.body.before,
      after: req.body.after
    }
    let msg = validateData(params)
    if(req.user.sub != workerId) return res.status(403).send({message: 'You cant delete this user'})
    if (msg) return res.status(400).send({ msg });
    let user = await User.findOne({ _id: workerId, rol: 'WORKER' });
    if (!user) return res.status(404).send({ message: 'Worker not found' });
    params.after = await encrypt(params.after)
    if (await compare(params.before, user.password)) {
      await User.findOneAndUpdate(
        { _id: workerId, rol: 'WORKER' },
        { password: params.after },
        { new: true }
      )
      return res.status(201).send({ message: 'Password was updated' })
    }
    return res.send({ message: 'Invalid Password' });
  } catch (err) {
    console.log(err);
  }
}


exports.updateWorker = async (req, res) => {
  try {
    let workerId = req.params.id;
    let params = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone
    };

    if (!req.body.password) return res.status(400).send({ message: 'Invalid password' });
    let msg = validateData(params);
    let user = await User.findOne({ _id: workerId, rol: 'WORKER' });

    if (!user) return res.status(404).send({ message: 'Worker not found or invalid rol' });
    if (user.rol !== 'ADMIN') return res.status(403).send({ message: 'Only admins can update workers' });

    if (msg) return res.status(400).send({ msg });
    if (compare(await req.body.password, user.password)) {
      await User.findOneAndUpdate({ _id: workerId, rol: 'WORKER' }, params, { new: true });
      return res.status(201).send({ message: 'Worker Updated succesfully' });
    }
    return res.send({ message: 'Invalid password' });
  } catch (err) {
    console.log(err);
  }
};


exports.deleteUser = async(req, res) =>{
  try {
    let userId = req.params.id;
    if(!req.body.password) return res.status(400).send({message: 'Invalid password'})
    if(req.user.sub != userId) return res.status(403).send({message: 'You cant delete this user'});
    await User.findOneAndDelete({_id: userId});
    return res.send({message: 'User deleted succesfully'})
  } catch (err) {
    console.error(err)
  }
}

exports.deleteWorker = async (req, res) => {
  try {
    let workerId = req.params.id;
    let userDeleted = await User.findOneAndDelete({ _id: workerId, rol: 'WORKER' });
    if (!userDeleted) return res.status(404).send({ message: 'User not found' });
    return res.status(201).send({ userDeleted })
  } catch (err) {
    console.log(err);
  }
}