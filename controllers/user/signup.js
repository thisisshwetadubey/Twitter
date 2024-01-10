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

      const checkUser = await Verify.findOne({ email });

      if (checkUser) {
        const updateUserVerification = await Verify.updateOne(
          { email },
          { $set: { name, username, email, password: encrypted, otp: otp } }
        );
      }
      const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);

      if (!checkUser) {
        const userVerification = await Verify.create({
          name: upperCaseName,
          username,
          email,
          password: encrypted,
          isGoogleAuth,
          otp: otp,
        });
        if (!userVerification) throw "Failed to register";
      }
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
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    const randomColor = [
      "Yellow",
      "Emerald",
      "Green",
      "Cyan",
      "Blue",
      "Fuchsia",
      "Violet",
      "Rose",
      "Pink",
      "Orange",
      "Amber",
      "Slate",
    ];

    const registerUser = await User.create({
      name: upperCaseName,
      username,
      email,
      password: encrypted,
      isGoogleAuth,
      color: randomColor[Math.floor(Math.random() * randomColor.length)],
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
      validate(req.body, jsonSchema);
      const instance = new signup();

      if (req.body.isGoogleAuth) {
        const token = await instance.GoogleAuth(req.body);
        res.cookie("jwt", token, {
          httpOnly: true,
          secure:
            process.env.COOKIE_SECRET_KEY == false
              ? process.env.COOKIE_SECRET_KEY
              : true, //conditional based on env
          sameSite: "strict",
          age: 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
          statusCode: 201,
          type: "Success",
          data: token,
        });
      }

      if (!req.body.isGoogleAuth) {
        const checkUser = await instance.checkUser(req.body.email);
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
