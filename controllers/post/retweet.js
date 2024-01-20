const Post = require("../../models/post");

class isRetweetToggle {
  async isRetweet(data, req) {
    try { 
      const rePost = {
        username: data.username,
        name: data.name,
        post: data.post,
        isRetweet: true,
        userId: data.userId,
        comment: data.comment,
        retweet: data.retweet,
        retweetUserId:{
          userId: req._id,
          name: req.name
        },
        like: data.like,
        isLike: data.like,
        isBookmark: data.isBookmark,
        tags: data.tags,
      }

      const result = await Post.create(rePost)
      let retweetedCount = data.retweet
      retweetedCount += 1
      await Post.updateOne({_id: data._id, isRetweet: false}, {retweet: retweetedCount})     

      return result;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {
    try {
      const instance = new isRetweetToggle();
      const data = await Post.findOne({ _id: req.params.id, isRetweet: false });
      if (!data) throw "Post does not exists!"; 
      const isRetweet = await instance.isRetweet(data, req.user);

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: isRetweet.retweetUserId,
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
