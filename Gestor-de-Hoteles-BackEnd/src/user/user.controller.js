"use strict";

const User = require("./user.model");
const { encrypt, validateData } = require("../utils/validate");
const { compare } = require("bcrypt");
const { createToken } = require("../services/jwt");
const Bill = require('../bill/bill.model')

exports.test = (req, res) => {
  return res.status(201).send({ message: "User test running" });
};

exports.createAdminDefault = async (req, res) => {
  try {
    let adminDefault = {
      name: "User",
      surname: "default",
      email: "admin",
      password: "admin",
      phone: "12021202",
      rol: "ADMIN",
    };
    let user = await User.findOne({ email: "admin" });
    if (user) return console.log("Admin already exists");
    adminDefault.password = await encrypt(adminDefault.password);
    let newAdmin = new User(adminDefault);
    await newAdmin.save();
    return console.log("Admin default was created");
  } catch (err) {
    return console.log(err);
  }
};
exports.login = async (req, res) => {
  try {
    let data = req.body;
    let user = await User.findOne({ email: data.email });
    let msg = validateData({ password: data.password });
    if (msg) return res.status(500).send({ msg });
    if (user && (await compare(data.password, user.password))) {
      let token = await createToken(user);
      let userLogged = {
        sub: user.sub,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
        rol: user.rol,
      };
      return res.send({
        message: "User logged successfully",
        token,
        userLogged,
      });
    }
    return res.status(404).send({ message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.message });
  }
};

exports.myInfo = async(req, res)=>{
  try {
    return res.send({myInfo: req.user});
  } catch (err) {
    console.log(err);
  }
}

exports.register = async (req, res) => {
  try {
    let data = req.body;
    let msg = validateData({ password: data.password });
    if (msg) return res.status(404).send({ msg });
    data.password = await encrypt(data.password);
    data.rol = "CLIENT";
    let newUser = new User(data);
    await newUser.save();
    return res.status(201).send({ message: "User saved successfully" });
  } catch (err) {
    console.log(err);
    if (err.code == 11000)
      return res.status(500).send({ error: "Email already exists" });
    return res.status(500).send({ error: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    let data = req.body;
    let userId = req.params.id;
    let me = req.user;
    let params = {
      email: data.email,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
    };
    let msg = validateData(params);
    if (msg) return res.status(400).send({ msg });
    if (data.password || data.password == "")
      return res.send({ message: "Password is not allowed" });
    if (data.rol || data.rol == "")
      return res.send({ message: "Rol is not allowed" });
    let userExists = await User.findOne({
      _id: userId,
      $or: [{ rol: "CLIENT" }, { rol: "WORKER" }],
    });
    if (!userExists) return res.status(404).send({ message: "Account not found" });
    if ((me.rol == "WORKER" || me.rol == "CLIENT") && me.sub != userId)
      return res.status(403).send({ message: "You cant update this account" });
    let userUpdated = await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    }).lean();
    delete userUpdated.password;
    return res.send({ userUpdated });
  } catch (err) {
    console.log(err);
    if (err.code == 11000)
      return res.status(500).send({ err: "Email already exists" });
    return res.status(500).send({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    let userId = req.params.id;
    let me = req.user;
    let params = {
      before: req.body.before,
      after: req.body.after,
    };
    let msg = validateData(params);
    if(msg) return res.status(400).send({msg})
    let userExists = await User.findOne({
      _id: userId,
      $or: [{ rol: "CLIENT" }, { rol: "WORKER" }],
    });
    if (!userExists) return res.status(404).send({ message: "Account not found" });
    if ((me.rol == "WORKER" || me.rol == "CLIENT") && me.sub != userId)
      return res.status(403).send({ message: "You cannot update the password for this accout" });
    if (!(await compare(params.before, userExists.password)))
      return res.send({ message: "Invalid Password" });
    if(await compare(params.after, userExists.password)) 
    return res.status(400).send({message: 'The new password cannot be the same as the old one'})
    params.after = await encrypt(params.after);
    await User.findOneAndUpdate(
      { _id: userId},
      { password: params.after },
      { new: true }
    );
    return res.status(201).send({ message: "Password was updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({error: err.message})
  }
};

exports.addWorker = async (req, res) => {
  try {
    let data = req.body;
    data.rol = 'WORKER'
    let msg = validateData({password: data.password})
    if(msg) return res.status(400).send({msg})
    data.password = await encrypt(data.password);
    let newWorker = new User(data);
    await newWorker.save();
    return res.send({ message: "Worker saved successfully" });
  } catch (err) {
    console.log(err);
    if(err.code === 11000) return res.status(500).send({err: 'Email already exists'})
    return res.status(500).send({error: err.message})
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await User.find({ rol: "CLIENT" }, {password: 0});
    return res.send({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({error: err.message})
  }
};

exports.getWorkers = async (req, res) => {
  try {
    let workers = await User.find({ rol: "WORKER" }, { password: 0 });
    return res.send({ workers });
  } catch (err) {
    console.log(err);
    return res.status(500).send({error: err.message})
  }
};

exports.getAccounts = async (req, res) => {
  try {
    let accounts = await User.find({}, { password: 0 });
    return res.send({ accounts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({error: err.message})
  }
};

exports.getAccount = async (req, res) => {
  try {
    let userId = req.params.id;
    let user = await User.findOne(
      { _id: userId },
      { password: 0 }
    );
    if (!user) return res.status(201).send({ message: "Account not found" });
    return res.status(201).send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({error: err.message})
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    let userId = req.params.id;
    let me = req.user;
    let msg = validateData({password: req.body.password})
    if(msg) return res.status(400).send({msg})
    if ((me.rol == 'CLIENT' && me.sub != userId) || me.rol == 'WORKER')
      return res.status(403).send({ message: "You cant delete this account" });
    let userExists = await User.findOne({_id: userId, $or: [{rol: 'CLIENT'}, {rol: 'WORKER'}]});
    if(!userExists) return res.status(400).send({ message: "Account not found" });
    const hasReservations = await Bill.exists({ user: userId });
    if (hasReservations) return res.status(400).send({ message: "Cannot delete account. There are reservations associated with it." });
    if(! await compare(req.body.password, userExists.password))
      return res.status(400).send({ message: "Invalid password, account not deleted" });

    let reservations = await Bill.find({ user: userId });
    const status = ['CANCELED', 'PAID'];
    const hasUnCancelableReservations = reservations.some(reservation => !status.includes(reservation.state));
    if (hasUnCancelableReservations) return res.status(400).send({ message: "Cannot delete account. There are reservations with uncancelable status." });

    await User.findOneAndDelete({ _id: userId });
    return res.send({ message: "Account deleted succesfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({error: err.message})
  }
};
