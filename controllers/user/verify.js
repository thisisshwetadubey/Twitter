const Verify = require("../../models/verify");
const User = require("../../models/user");
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/user/verify");
const jwt = require("jsonwebtoken");

class verify {
  async verifyOTP(data) {
    const { email, otp } = data;
    const user = await Verify.findOne({ email });

    if (!user) throw "User not found";

    if (user.otp != otp) throw "Invalid OTP";

    const verifiedUser = User.create({
      name: user.name,
      userName: user.userName,
      email: user.email,
      password: user.password,
    });

    if (!verifiedUser) throw "Registration Failed";
    return verifiedUser;
  }

  async process(req, res) {
    try {
      validation(req.body, jsonSchema);
      const instance = new verify();
      let token;
      const verified = await instance.verifyOTP(req.body);
      if (verified) {
        token = jwt.sign(
          {
            id: verified._id,
            email: verified.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );
      }

      const deleteUser = await Verify.findOne({ otp: req.body.otp });
      await Verify.deleteOne({ _id: deleteUser._id });

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: token,
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
