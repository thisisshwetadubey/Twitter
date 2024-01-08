const Post = require("../../models/post");

class isRetweetToggle {
  async isRetweet(id) {
    try {
      const find = await Post.findOne({ _id: id });
      let count;
      if (!find.isRetweet) {
        count = find.retweet;
        count += 1;
        await Post.updateOne(
          { _id: id },
          {
            isRetweet: true,
            retweet: count,
          }
        );
        return "Post retweeted!";
      }

      count = find.retweet;
      count -= 1;
      await Post.updateOne(
        { _id: id },
        {
          isRetweet: false,
          retweet: count,
        }
      );

      return "Post deleted!";
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new isRetweetToggle();
      const isRetweet = await instance.isRetweet(req.params.id);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: isRetweet,
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

module.exports = new isRetweetToggle();
