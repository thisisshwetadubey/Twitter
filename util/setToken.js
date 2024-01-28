const jwt = require("jsonwebtoken");

module.exports = (res, id) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    const options = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
      secure: true,
      sameSite: "none"
    };

    res.cookie("jwt", token, options);
  } catch (error) {
    throw "Unable to create token";
  }
};
