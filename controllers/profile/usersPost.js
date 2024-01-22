const Post = require("../../models/post");
const User = require("../../models/user");

class usersPost {
  async posts(id) {
    try {
      const post = await Post.find({ userId: id });
      if (!post) throw "Post doesn't exists for user";
      return post;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new usersPost();
      const find = await User.findOne({ _id: req.user._id });

      if (!find) throw "User doesn't exists";

      const posts = await instance.posts(req.user._id);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: posts,
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

module.exports = new usersPost();
