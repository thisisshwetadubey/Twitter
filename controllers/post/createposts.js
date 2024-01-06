const Post = require("../../models/post");
const User = require("../../models/user")
const validation = require("../../util/validate");
const jsonSchema = require("../../jsonSchema/post/post")

class createPost {

  async findUser(id){
    try {
        const find = await User.findOne({_id: id})

        if(!find) throw "User doesn't exists"
        return ""
    } catch (error) {
        throw error
    }

  }  

  async post(data) {
    try {
      const { post, isRetweet, userId, comment, retweet, like } = data;
      const posted = await Post.create({
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
        console.log("inside post process");
      validation(req.body, jsonSchema);
      const instance = new createPost();
      const findUser = await instance.findUser(req.body.userId) 
      const result = await instance.post(req.body);
      if(result){
        res.status(201).json({
            statusCode: 201,
            type: "Success",
            data : result
        })
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
