const Post = require("../../models/post");

class isBookmarkToggle {
  async isBookmark(id) {
    try {
      const find = await Post.findOne({ _id: id });
      
      if (!find.isBookmark) {
        await Post.updateOne(
          { _id: id },
          {
            isBookmark: true
          }
        );
        return "Bookmarked Post!";
      }

      await Post.updateOne(
        { _id: id },
        {
          isBookmark: false
        }
      );

      return "UnBookmarked Post!";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new isBookmarkToggle();
      const isBookmark = await instance.isBookmark(req.params.id);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: isBookmark,
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

module.exports = new isBookmarkToggle();
