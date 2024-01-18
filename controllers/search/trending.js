const Post = require("../../models/post");

class Trending {
  async trending() {
    try {
      const trending = await Post.aggregate([
        {
          $unwind: {
            path: "$tags",
          },
        },

        {
          $group: {
            _id: "$tags",
            trendingCount: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $project: {
            _id: 0,
            trending: "$_id",
          },
        },
      ]);
      if (!trending) throw "No data found";
      const finalResult = trending.map((doc, index) => ({
        _id: index + 1,
        ...doc,
      }));

      return finalResult;
    } catch (error) {
      throw error;
    }
  }
  async process(req, res) {
    try {
      const instance = new Trending();
      const result = await instance.trending();
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

module.exports = new Trending();
