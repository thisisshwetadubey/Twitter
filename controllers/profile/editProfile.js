const User = require("../../models/user");

class EditProfile {
  async editProfile(data, req) {
  
    try {
      const edited = await User.updateOne({ _id: req._id }, data);
      if (edited.modifiedCount !== 1) throw "Unable to update profile";

      return "Profile updated successfully";
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const instance = new EditProfile(req.body);
      const find = await User.find({ _id: req.user._id });
      if (!find) throw "User does not exists";

      const editedProfile = await instance.editProfile(req.body, req.user);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: editedProfile,
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

module.exports = new EditProfile();
