import patientServices from "../services/patientServices";

let postPatientBookAppointment = async (req, res) => {
  try {
    let data = await patientServices.postPatientBookAppointment(req.body);

    return res.status(200).json(data);
  } catch (error) {
    console.log("ERROR in controller:", error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  postPatientBookAppointment,
};
