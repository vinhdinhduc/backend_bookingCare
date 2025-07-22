import db from "../models/index";
import emailServices from "./emailServices";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

const buildUrl = (token, doctorId) => {
  return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
};

const postPatientBookAppointment = async (data) => {
  try {
    if (
      !data.email ||
      !data.doctorId ||
      !data.timeType ||
      !data.date ||
      !data.fullName ||
      !data.selectedGender ||
      !data.address
    ) {
      return {
        errCode: 1,
        errMessage: "Missing parameter required",
      };
    }

    const token = uuidv4();

    await emailServices.sendSimpleEmail({
      receiverEmail: data.email,
      patientName: data.fullName,
      time: data.timeString,
      doctorName: data.doctorName,
      language: data.language,
      redirectLink: buildUrl(token, data.doctorId),
    });

    const [user, userCreated] = await db.User.findOrCreate({
      where: { email: data.email },
      defaults: {
        email: data.email,
        roleId: "R3",
      },
    });

    if (user) {
      const [booking, bookingCreated] = await db.Booking.findOrCreate({
        where: {
          patientId: user.id,
          doctorId: data.doctorId,
          date: data.date,
          timeType: data.timeType,
        },
        defaults: {
          statusId: "S1",
          doctorId: data.doctorId,
          date: data.date,
          patientId: user.id,
          timeType: data.timeType,
          token: token,
        },
        raw: false,
      });

      if (!bookingCreated) {
        booking.token = token;
        booking.statusId = "S1";
        await booking.save();
      } else {
      }
    }

    return {
      errCode: 0,
      errMessage: "Save info success",
    };
  } catch (error) {
    console.error(" ERROR in postPatientBookAppointment:", error);
    throw error;
  }
};

const postVerifyBookAppointment = async (data) => {
  try {
    if (!data.doctorId || !data.token) {
      return {
        errCode: 1,
        errMessage: "Missing parameter required",
      };
    }

    const appointment = await db.Booking.findOne({
      where: {
        doctorId: data.doctorId,
        token: data.token,
        statusId: "S1",
      },
      raw: false,
    });

    if (appointment) {
      appointment.statusId = "S2";
      await appointment.save();

      return {
        errCode: 0,
        errMessage: "Update appointment succeed",
      };
    } else {
      return {
        errCode: 2,
        errMessage: "Appointment does not exist or already confirmed",
      };
    }
  } catch (error) {
    console.error(" ERROR in postVerifyBookAppointment:", error);
    throw error;
  }
};

module.exports = {
  postPatientBookAppointment,
  postVerifyBookAppointment,
};
