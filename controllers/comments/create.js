const Post = require("../../models/post");
const User = require("../../models/user");
const Comments = require("../../models/comments");
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/comments/comments");

class CreateComments {
  async checkIfPostAndUser(data) {
    try {
      const checkUser = await User.findOne({ _id: data.userId });
      if (!checkUser) throw "User doesn't exists";

      const checkPost = await Post.findOne({ _id: data.postId });
      if (!checkPost) throw "Post doesn't exists";
      return checkUser;
    } catch (error) {
      throw error;
    }
  }

  async comment(data, user) {
    try {
      const commented = await Comments.create({
        comments: data.comments,
        postId: data.postId,
        userId: data.userId,
        userName: user.username,
        name: user.name,
        profilePicture: user.color,
      });
      if (!commented) throw "Failed to add comment";
      return "Comment added successfully";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      validation(req.body, jsonSchema);
      const instance = new CreateComments();
      const checkIfPostAndUser = await instance.checkIfPostAndUser(req.body);
      const comments = await instance.comment(req.body, checkIfPostAndUser);

      res.status(201).json({
        statusCode: 201,
        type: "Success",
        data: comments,
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

module.exports = new CreateComments();
