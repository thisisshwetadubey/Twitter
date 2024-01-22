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

  async post(post, user) {
    try {
      const tags = post.split(" ")
      const hashtagWord = tags.filter((word) => word.startsWith("#"));

      const posted = await Post.create({
        username: user.username,
        name: user.name,
        userId: user._id,
        post: post,
        tags: hashtagWord
        
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
      
      const findUser = await instance.findUser(req.user._id);

      const result = await instance.post(req.body.post, findUser);
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
