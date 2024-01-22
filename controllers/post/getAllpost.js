const Post = require("../../models/post");

class Posts {
  async post() {
    try {
      const posts = await Post.find().sort({"createdAt": -1});
      if (!posts) throw "Post doesn't exists";
      return posts;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const instance = new Posts();
      const posts =  await instance.post();
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

module.exports = new Posts();
