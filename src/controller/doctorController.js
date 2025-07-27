import doctorService from "../services/doctorService";

let getTopDoctorHomeController = async (req, res) => {
  try {
    let limit = req.query.limit;
    if (!limit) {
      limit = 10;
    }
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error from getTopDoctorHome:", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let response = await doctorService.getAllDoctorService();
    return res.status(200).json(response);
  } catch (error) {
    log.error("Error from getAllDoctors:", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let saveInfoDoctor = async (req, res) => {
  try {
    let message = await doctorService.saveInfoDoctorService(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.log("Error from saveInfoDoctor:", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let response = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error from getDetailDoctorById:", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let data = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let data = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
let getExtraInfoById = async (req, res) => {
  try {
    let data = await doctorService.getExtraInfoById(req.query.doctorId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
let getProfileDoctorById = async (req, res) => {
  try {
    let data = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
let getPatientAppointment = async (req, res) => {
  try {
    let data = await doctorService.getPatientAppointment(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log("error controller", error);

    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let data = await doctorService.sendRemedy(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log("error controller", error);

    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getTopDoctorHomeController,
  getAllDoctors,
  saveInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInfoById,
  getProfileDoctorById,
  getPatientAppointment,
  sendRemedy,
};
