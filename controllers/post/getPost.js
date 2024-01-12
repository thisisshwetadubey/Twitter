const Post = require("../../models/post");
const User = require("../../models/user");

class getPosts {
  async posts(id) {
    try {

      const post = await Post.findOne({_id:id  });
      if (!post) throw "Post does not exists";

      return post;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new getPosts();

      const posts = await instance.posts(req.params.id);

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

module.exports = new getPosts();
