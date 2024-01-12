const Post = require("../../models/post");

class isLikeToggle {
  async isLike(id) {
    try {
      const find = await Post.findOne({ _id: id });
      let count;
      if (!find.isLike) {
        count = find.like;
        count += 1;
        await Post.updateOne(
          { _id: id },
          {
            isLike: true,
            like: count,
          }
        );
        return "Post Liked!";
      }

      count = find.like;
      count -= 1;
      await Post.updateOne(
        { _id: id },
        {
          isLike: false,
          like: count,
        }
      );

      return "Post UnLiked!";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new isLikeToggle();
      const isLike = await instance.isLike(req.params.id);

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
