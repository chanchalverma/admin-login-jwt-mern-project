const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/system-login",
  {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// acknowledge error or connection to Db
//==
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
  console.log("welcome to MongooseDB");
}); //== optioal part
mongoose.set("debug", true); // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

module.exports.User = require("./user");
