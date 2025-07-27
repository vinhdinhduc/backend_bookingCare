import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";

import clinicController from "../controller/clinicController";
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
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-info-doctor", doctorController.saveInfoDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-by-date", doctorController.getScheduleByDate);
  router.get("/api/get-extra-info-by-id", doctorController.getExtraInfoById);
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-patient-appointment",
    doctorController.getPatientAppointment
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.post(
    "/api/patient-book-appointment",
    patientController.postPatientBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );
  router.post(
    "/api/create-new-specialty",
    specialtyController.createNewSpecialty
  );

  router.get("/api/get-specialty", specialtyController.getSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.post("/api/create-new-clinic", clinicController.createNewClinic);

  router.get("/api/get-clinic", clinicController.getAllClinic);
  router.get("/api/get-detail-clinic-by-id", clinicController.getClinicById);
  return app.use("/", router);
};
export default initWebRoutes;
