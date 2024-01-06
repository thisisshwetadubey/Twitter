const Post = require("../../models/post");

class updatePost {
  async update(data) {
    try {
      const updated = await Post.updateOne({ _id: data.id }, data);
      if (updated.modifiedCount !== 1) throw "Unable to update post";
      return "Post updated successfully";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new updatePost();
      const find = Post.findOne(req.body.id);
      if (!find) throw "No Post found!";
      const updated = await instance.update(req.body);
      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: updated,
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

module.exports = new updatePost();
