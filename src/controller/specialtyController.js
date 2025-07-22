import specialtyServices from "../services/specialtyServices";

let createNewSpecialty = async (req, res) => {
  try {
    let data = await specialtyServices.createNewSpecialty(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};
let getSpecialty = async (req, res) => {
  try {
    let data = await specialtyServices.getSpecialty();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let data = await specialtyServices.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server!",
    });
  }
};

module.exports = {
  createNewSpecialty,
  getSpecialty,
  getDetailSpecialtyById,
};
