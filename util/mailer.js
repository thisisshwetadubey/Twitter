const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

module.exports = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dubeyshweta7049@gmail.com",
        pass: "nhfa ocju ujfe ghkf",
      },
    });

    const otp = otpGenerator.generate(4, {
      digits : true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets : false,
      upperCase: false,
      specialChars: false,
    });

    const mailOptions = {
      from: "dubeyshweta7049@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    };

    const sendMail = await transporter.sendMail(mailOptions);
    if (!sendMail) throw "Failed to send OTP";

    return otp;
  } catch (error) {
    throw error;
  }
};
