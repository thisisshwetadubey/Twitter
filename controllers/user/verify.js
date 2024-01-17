const Verify = require("../../models/verify");
const User = require("../../models/user");
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/user/verify");
const setToken = require("../../util/setToken");

class verify {
  async verifyOTP(data) {
    const { email, otp } = data;
    const user = await Verify.findOne({ email });

    if (!user) throw "User not found";

    if (user.otp != otp) throw "Invalid OTP";
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

    const verifiedUser = await User.create({
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      color: randomColor[Math.floor(Math.random() * randomColor.length)],
    });

    if (!verifiedUser) throw "Registration Failed";
    return verifiedUser;
  }

  async process(req, res) {
    try {
      validation(req.body, jsonSchema);
      const instance = new verify();
      const verified = await instance.verifyOTP(req.body);

      if (verified) {
        const token = setToken(res, verified._id)
      }
      
      const deleteUser = await Verify.findOne({ otp: req.body.otp });
      await Verify.deleteOne({ _id: deleteUser._id });
      const data = {
        _id: verified._id,
        name: verified.name,
        username: verified.username,
        email: verified.email,
        color: verified.color
      };

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        age: 24 * 60 * 60 * 1000

      })
      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: data,
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

module.exports = new verify();
