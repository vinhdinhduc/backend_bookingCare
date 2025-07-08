import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
  //API routes
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.webAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleUserLogin);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  router.get("/api/allcode", userController.handleGetAllCode);
  router.get(
    "/api/top-doctor-home",
    doctorController.getTopDoctorHomeController
  );
  return app.use("/", router);
};
export default initWebRoutes;
