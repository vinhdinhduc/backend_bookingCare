import userServices from "../services/userServices.js";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
          // Cách 1: dùng asynchronous (bất đồng bộ)
          //let check = await bcrypt.compare(password, user.password);

          // Cách 2: dùng synchronous  (đồng bộ)
          let check = bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
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
module.exports = {
  handleUserLogin,
  handleGetAllUsers,
  handleEditUser,
  handleDeleteUser,
  handleCreateNewUser,
};
