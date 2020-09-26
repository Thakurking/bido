if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const index = require("./routes/index");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use("/", index);

mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to mongoDB"));

app.listen(process.env.PORT || 3000);
