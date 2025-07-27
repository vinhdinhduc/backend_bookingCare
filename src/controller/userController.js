import userServices from "../services/userServices.js";
import db from "../models";
import bcrypt from "bcryptjs";
let handleUserLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing email or password",
      });
    }

    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json(userData);
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

const handleCreateNewUser = async (req, res) => {
  let message = await userServices.createNewUser(req.body);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  }
  let message = await userServices.deleteUser(req.body.id);
  return res.status(200).json(message);
};

const handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userServices.updateUserData(data);
  return res.status(200).json(message);
};

const handleGetAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter",
      users: [],
    });
  }
  let users = await userServices.getAllUser(id);

  return res.status(200).json({
    errCode: 0,
    message: "OK",
    users,
  });
};
const handleGetAllCode = async (req, res) => {
  try {
    let data = await userServices.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Get all code error", e);

    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleUserLogin,
  handleGetAllUsers,
  handleEditUser,
  handleDeleteUser,
  handleCreateNewUser,
  handleGetAllCode,
};
