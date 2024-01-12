const Comments = require("../../models/comments");
const Post = require("../../models/post")


class GetComment {
  
  async getComments(id) {
    
    try {
      const find = await Comments.find({postId: id}).sort({"updatedAt":-1})
      if(!find) throw 'No data found'
      return find;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {

    try {
      const instance = new GetComment();
      const findPost = await Post.findOne({_id: req.params.id})
      if(!findPost) throw "Post doesn't exists"

      const comments = await instance.getComments(req.params.id);

      res.status(200).json({
        statusCode: 200,
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

module.exports = new GetComment();
