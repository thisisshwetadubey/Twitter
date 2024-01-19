const Post = require("../../models/post");
const Like = require("../../models/like");

class isLikeToggle {
  async addLike(data, req) {
    try {
      let likeCount = data.like;
      const find = await Like.findOne({ userId: req._id, postId: data._id });
      if (find) {
        const deleteRecord = await Like.deleteOne({ _id: find._id });
        likeCount -= 1;
        const updateCount = await Post.updateOne(
          { _id: find._id },
          { like: likeCount }
        );
        return "Post Un-Liked!";
      }
      const add = await Like.create({
        postId: data._id,
        userId: data.userId,
      });
      likeCount += 1;
      const updateCount = await Post.updateOne(
        { _id: data._id },
        { like: likeCount }
      );
      return "Post Liked!";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new isLikeToggle();
      const data = await Post.findOne({ _id: req.params.id });
      if (!data) throw "Post does not exists!";
      const isLike = await instance.addLike(data, req.user);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: isLike,
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

module.exports = new isLikeToggle();
