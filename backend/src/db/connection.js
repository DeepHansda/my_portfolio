const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// const uri = "mongodb://localhost:27017/my_portfolio";
const uri = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

const connection = () =>
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      // useCreateIndex:true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = connection;
