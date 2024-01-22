const Post = require("../../models/post");

class TrendingNews {
  async news() {
    try {
      const newsFilter = await Post.find({ tags: "#news" }, { tags: 1 });

      const result = newsFilter.flatMap((item, index) => {
        if (item.tags.length == 1 && item.tags[0] == "#news") {
          return { _id: index + 1, trendingNews: "#news" };
        } else {
          return item.tags
            .filter((tag) => tag !== "#news")
            .map((tag) => ({ _id: index + 1, trendingNews: tag }));
        }
      });

      if (!result) "No data found";
      return result;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new TrendingNews();
      const result = await instance.news();

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: result,
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
module.exports = new TrendingNews();
