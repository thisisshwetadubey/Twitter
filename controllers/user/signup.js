const Verify = require("../../models/verify");
const User = require("../../models/user");
const validate = require("../../util/validate")
const jsonSchema = require("../../jsonSchema/user/signup")
const bcrypt = require("bcryptjs");
const sendOtp = require("../../util/mailer");

class signup {
  
  async checkUser(email) {
    try {
      const check = await User.findOne({ email });
      if (check) throw "User already exists";
      return;
    } catch (error) {
      throw error;
    }
  }

  async verifyUser(data) {
    try {
      const { name, email, password } = data;
      const salt = await bcrypt.genSalt(10);
      const encrypted = await bcrypt.hash(password, salt);

      const otp = await sendOtp(email);

      const userVerification = await Verify.create({
        name,
        email,
        password: encrypted,
        otp: otp,
      });
      if (!userVerification) throw "Failed to register";

      return "OTP sended successfully";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      validate(req.body, jsonSchema)
      const instance = new signup();
      const checkUser = await instance.checkUser(req.body.email);
      const verifyUser = await instance.verifyUser(req.body);

      res.status(201).json({
        statusCode: 200,
        type: "Success",
        data: verifyUser,
      });
    } catch (error) {
      res.status(400).json({
        statusCode: 400,
        type: "Error",
        error: error.error || error,
      });
    }
  }
}

module.exports = new signup();
