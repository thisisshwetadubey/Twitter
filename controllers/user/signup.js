const Verify = require("../../models/verify");
const User = require("../../models/user");
const validate = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/user/signup");
const bcrypt = require("bcryptjs");
const sendOtp = require("../../util/mailer");
const jwt = require("jsonwebtoken");

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
      const { name, username, email, password, isGoogleAuth } = data;
      const salt = await bcrypt.genSalt(10);
      const encrypted = await bcrypt.hash(password, salt);

      const otp = await sendOtp(email);

      const userVerification = await Verify.create({
        name,
        username,
        email,
        password: encrypted,
        isGoogleAuth,
        otp: otp,
      });
      if (!userVerification) throw "Failed to register";

      return "OTP sended successfully";
    } catch (error) {
      throw error;
    }
  }

  async GoogleAuth(data) {
    const { name, username, email, password, isGoogleAuth } = data;
    const instance = new signup();
    const checkUser = await instance.checkUser(email);
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);

    const registerUser = await User.create({
      name,
      username,
      email,
      password: encrypted,
      isGoogleAuth,
    });

    const token = jwt.sign(
      {
        id: registerUser._id,
        email: registerUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    return token;
  }

  async process(req, res) {
    try {
      const { name, username, email, password, isGoogleAuth } = req.body;
      validate(req.body, jsonSchema);
      const instance = new signup();

      if (req.body.isGoogleAuth) {
        const token = await instance.GoogleAuth(req.body);

        res.status(201).json({
          statusCode: 201,
          type: "Success",
          data: token,
        });
      }

      if (!req.body.isGoogleAuth) {
        const checkUser = await instance.checkUser(email);
        const verifyUser = await instance.verifyUser(req.body);

        res.status(201).json({
          statusCode: 200,
          type: "Success",
          data: verifyUser,
        });
      }
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
