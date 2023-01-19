const UserModel = require("../models/user.model");
const { userMessages } = require("../helpers/messages");
const { compare, encrypt } = require("../helpers/encryption");
const { pickUser, pickUsersArray } = require("../helpers/user-utilities");

class UserCtrl {
  static createUser(req, res) {
    const user = req.body;

    if (req.file) user.avatar = `user-profile/${req.file.filename}`;
    if (user.password) user.password = encrypt(user.password);
    new UserModel(user)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: userMessages?.created, data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err, message: userMessages.notCreated });
      });
  } //createUser

  static updateUser(req, res) {
    const user = req.body;
    const { id } = req?.params;
    if (req.file) user.avatar = `user-profile/${req.file.filename}`;
    if (user.password) user.password = encrypt(user.password);
    UserModel.updateOne({ _id: id }, user)
      .then((result) => {
        res
          .status(200)
          .send({ message: userMessages?.updated, data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err, message: userMessages.notUpdated });
      });
  } //updateUser

  static deleteUser(req, res) {
    const { id } = req?.params;
    UserModel.remove({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: userMessages?.deleted, data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: err, message: userMessages.notDeleted });
      });
  } //deleteUser

  static getOneUser(req, res) {
    const { id } = req?.params;
    UserModel.findOne({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: userMessages?.getOne, data: pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ error: err, message: userMessages.notGetOne });
      });
  } //getOneUser

  static getAllUser(req, res) {
    const { role } = req.query;
    const filter = {};
    if (role) filter.role = role;

    UserModel.find(filter)
      .then((result) => {
        return res.status(200).send({
          message: userMessages?.getAll,
          data: pickUsersArray(result),
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(404)
          .send({ error: err, message: userMessages.notGetAll });
      });
  } //getAllUser
}
module.exports = UserCtrl;
