const mongoose = require("mongoose");

class MongoDb {
  async connectDB() {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected📶`);
    } catch (error) {
      console.log("Error while connecting database", error);
      process.exit(1);
    }
  }
}
module.exports = new MongoDb();
