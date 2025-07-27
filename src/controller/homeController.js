import db from "../models";
import CRUDservices from "../services/CRUDservices";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let webAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDservices.createNewUser(req.body);

  return res.send("Đức Vình post CRUD");
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDservices.getAllUser();
  console.log("------------------");
  console.log("------------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservices.getUserInfoById(userId);
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDservices.updateUserData(data);

  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDservices.deleteUserById(id);
    return res.send("Delete user succeed");
  } else {
    return res.send("User not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  webAboutPage: webAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
