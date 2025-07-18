import db from "../models/index";
import emailServices from "./emailServices";
require("dotenv").config();

let postPatientBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await emailServices.sendSimpleEmail({
        receiverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName: data.doctorName,
        language: data.language,
        redirectLink: "https://www.facebook.com/inhucvinh.783100/",
      });
      console.log("Data input:", data);
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter required",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              date: data.date,
              patientId: user[0].id,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save info success",
        });
      }
    } catch (error) {
      console.log("ERROR in patientServices:", error);
      reject(error);
    }
  });
};
module.exports = {
  postPatientBookAppointment,
};
