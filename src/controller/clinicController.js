import clinicServices from "../services/clinicServices";

let createNewClinic = async (req, res) => {
  try {
    let data = await clinicServices.createNewClinic(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let data = await clinicServices.getAllClinic();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};
let getClinicById = async (req, res) => {
  try {
    let data = await clinicServices.getClinicById(req.query.id);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};
module.exports = {
  createNewClinic,
  getClinicById,
  getAllClinic,
};
