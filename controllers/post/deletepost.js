const Post = require("../../models/post");

class deletePost {
  async delete(id) {
    try {
      const deleted = await Post.deleteOne({ _id: id });
      if (deleted.deletedCount !== 1) throw "Unable to delete post";

      return "Post deleted successfully";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new deletePost();
      const find = await Post.findOne({ _id: req.params.id });
      if (!find) throw "No Post found!";

      const deleted = await instance.delete(req.params.id);
      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: deleted,
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

module.exports = new deletePost();
