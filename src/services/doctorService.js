import db from "../models/index";
require("dotenv").config();
import lodash, { includes, reject } from "lodash";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (inputLimit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        limit: inputLimit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let checkRequiredField = (inputData) => {
  let arrField = [
    "doctorId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "nameClinic",
    "addressClinic",
    "note",
    "specialtyId",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrField.length; i++) {
    if (!inputData[arrField[i]]) {
      isValid = false;
      element = arrField[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};
let saveInfoDoctorService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredField(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing required : ${checkObj.element}`,
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });

          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;
            doctorMarkdown.updatedAt = new Date();
            await doctorMarkdown.save();
          }
        }
        let doctorInfo = await db.Doctor_Info.findOne({
          where: { doctorId: inputData.doctorId },
          raw: false,
        });
        if (doctorInfo) {
          doctorInfo.doctorId = inputData.doctorId;
          doctorInfo.priceId = inputData.selectedPrice;
          doctorInfo.provinceId = inputData.selectedProvince;
          doctorInfo.paymentId = inputData.selectedPayment;
          doctorInfo.nameClinic = inputData.nameClinic;
          doctorInfo.addressClinic = inputData.addressClinic;
          doctorInfo.note = inputData.note;
          doctorInfo.specialtyId = inputData.specialtyId;
          doctorInfo.clinicId = inputData.clinicId;
          await doctorInfo.save();
        } else {
          await db.Doctor_Info.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            provinceId: inputData.selectedProvince,
            paymentId: inputData.selectedPayment,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
          });
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Save doctor info successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameters",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          for (let item of schedule) {
            await db.Schedule.findOrCreate({
              where: {
                doctorId: data.doctorId,
                date: item.date,
                timeType: item.timeType,
              },
              default: {
                maxNumber: MAX_NUMBER_SCHEDULE,
                currentNumber: 0,
              },
            });
          }
        }
        //Get all existing
        // let existing = await db.Schedule.findAll({
        //   where: {
        //     doctorId: data.doctorId,
        //     date: data.formatedDate,
        //   },
        //   attributes: ["timeType", "date", "doctorId", "maxNumber"],
        //   raw: true,
        // });
        // //convertDate
        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }
        // //compare different
        // let toCreate = _.differenceWith(schedule, existing, (a, b) => {
        //   return a.timeType === b.timeType && a.date == b.date;
        // });
        // //create data
        // if (toCreate && toCreate.length > 0) {
        //   await db.Schedule.bulkCreate(toCreate);
        // }

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      console.log("Errorr", error);
      reject(error);
    }
  });
};
let getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dateObj = new Date(parseInt(date));
      const startDate = new Date(dateObj.setHours(0, 0, 0, 0));
      const endDate = new Date(dateObj.setHours(23, 59, 59, 999));
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: {
              [db.Sequelize.Op.between]: [startDate, endDate],
            },
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeDate",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getExtraInfoById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter required!",
        });
      } else {
        let data = await db.Doctor_Info.findOne({
          where: { doctorId: inputId },
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getProfileDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter required",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getPatientAppointment = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const dateObj = new Date(parseInt(date));
      // const startDate = new Date(dateObj.setHours(0, 0, 0, 0));
      // const endDate = new Date(dateObj.setHours(23, 59, 59, 999));
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let dataPatient = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
            date: date,
            statusId: "S2",
            // date: {
            //   [db.Sequelize.Op.between]: [startDate, endDate],
            // },
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "firstName",
                "lastName",
                "address",
                "gender",
                "email",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataPatient) dataPatient = [];
        resolve({
          errCode: 0,
          data: dataPatient,
        });
      }
    } catch (error) {
      console.log("error servive", error);

      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctorService: getAllDoctorService,
  saveInfoDoctorService: saveInfoDoctorService,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInfoById: getExtraInfoById,
  getProfileDoctorById: getProfileDoctorById,
  getPatientAppointment: getPatientAppointment,
};
