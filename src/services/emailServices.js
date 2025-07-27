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
let sendAttachment = async (dataSend) => {
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

  await transporter.sendMail({
    from: '"Đức Vình MedicalBook" <vinhdinh568@gmail.com>',
    to: dataSend.email,
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTMLWithAttachment(dataSend),
    attachments: [
      {
        filename: `remedy ${dataSend.patientId} - ${new Date().getTime()}.png`,
        content:
          dataSend.imageBase64 && dataSend.imageBase64.includes("base64,")
            ? dataSend.imageBase64.split("base64,")[1]
            : "",
        encoding: "base64",
      },
    ],
  });
};

let getBodyHTML = (dataSend) => {
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
let getBodyHTMLWithAttachment = (dataSend) => {
  let result = "";

  if (dataSend.language === "vi") {
    result = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h3 style="color: #2c3e50;">Xin chào ${dataSend.patientName}!</h3>
        <p>Cảm ơn bạn đã sử dụng dịch vụ khám bệnh tại MediBook.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #495057; margin-top: 0;">Thông tin khám bệnh:</h4>
          <div><b>Thời gian:</b> ${dataSend.time}</div>
          <div><b>Bác sĩ:</b> ${dataSend.doctorName}</div>
           
          
        </div>
        
        <p>Kèm theo email này là kết quả khám bệnh và các tài liệu liên quan.</p>
        
        ${
          dataSend.imageBase64 || dataSend.imageBuffer
            ? '<div style="text-align: center; margin: 20px 0;"><img src="cid:medical-report" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px;"></div>'
            : ""
        }
        
        <p style="color: #666;">Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.</p>
        <div style="margin-top: 30px; color: #666;">Trân trọng,<br>Đội ngũ MediBook</div>
      </div>
    `;
  } else {
    result = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h3 style="color: #2c3e50;">Dear ${dataSend.patientName}!</h3>
        <p>Thank you for using our medical service at MediBook.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #495057; margin-top: 0;">Medical Information:</h4>
          <div><b>Time:</b> ${dataSend.time}</div>
          <div><b>Doctor:</b> ${dataSend.doctorName}</div>
          
        </div>
        
        <p>Please find attached your medical report and related documents.</p>
        
        ${
          dataSend.imageBase64 || dataSend.imageBuffer
            ? '<div style="text-align: center; margin: 20px 0;"><img src="cid:medical-report" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px;"></div>'
            : ""
        }
        
        <p style="color: #666;">If you have any questions, please don't hesitate to contact us.</p>
        <div style="margin-top: 30px; color: #666;">Best regards,<br>MediBook Team</div>
      </div>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
