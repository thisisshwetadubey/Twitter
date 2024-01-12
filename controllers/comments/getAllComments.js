const Comments = require("../../models/comments");


class AllComments {
  
  async getComments(data, user) {
    
    try {
      const find = await Comments.find().sort({"updatedAt":-1})
      if(!find) throw 'No data found'
      return find;
    } catch (error) {
      throw error;
    }
  }

  async process(req, res) {

    try {
      const instance = new AllComments();
      const find = await instance.getComments();

      res.status(200).json({
        statusCode: 200,
        type: "Success",
        data: find,
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

module.exports = new AllComments();
