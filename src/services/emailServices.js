import nodemailer from "nodemailer";
require("dotenv").config();
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let sendSimpleEmail = async (dataSend) => {
  await transporter.sendMail({
    from: '"Đức Vình MedicalBook" <vinhdinh568@gmail.com>',
    to: dataSend.receiverEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTML(dataSend),
  });
};

let getBodyHTML = (dataSend) => {
  console.log("Sending token:", dataSend.redirectLink);
  let result = "";

  if (dataSend.language === "vi") {
    result = `
     <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên MediBook.</p>
      <p>Thông tin lịch hẹn:</p>
      <div><b>Thời gian: ${dataSend.time}</b></div>
      <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
      <p>Nếu các thông tin trên đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      <div>
        <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
      </div>
      <div>Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
     <h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment on MediBook.</p>
      <p>Appointment information:</p>
      <div><b>Time: ${dataSend.time}</b></div>
      <div><b>Doctor: ${dataSend.doctorName}</b></div>
      <p>If the above information is correct, please click on the link below to confirm and complete the appointment procedure.</p>
      <div>
        <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
      </div>
      <div>Thank you very much!</div>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
};
