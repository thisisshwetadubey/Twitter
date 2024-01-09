const Post = require("../../models/post");
const User = require("../../models/user");
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/post/post");

class createPost {
  async findUser(id) {
    try {
      const find = await User.findOne({ _id: id });

      if (!find) throw "User doesn't exists";
      return find;
    } catch (error) {
      throw error;
    }
  }

  async post(data, userData) {
    try {
      const { post, isRetweet, userId, comment, retweet, like } = data;
      const posted = await Post.create({
        username: userData.username,
        name: userData.name,
        post,
        isRetweet,
        userId,
        comment,
        retweet,
        like,
      });
      if (!posted) throw "Unable to result post!";
      return "Post created successfully";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      validation(req.body, jsonSchema);
      const instance = new createPost();
      const findUser = await instance.findUser(req.body.userId);
      console.log("🚀  findUser:", findUser);
      const result = await instance.post(req.body, findUser);
      if (result) {
        res.status(201).json({
          statusCode: 201,
          type: "Success",
          data: result,
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

module.exports = new createPost();
