if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const index = require("./routes/index");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/", index);


//===========mongoDB Connection==============//
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`mongoDB Disconnected on: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
connectDB();
//===========================================//

//============PORT Connection===============//
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server crashed on ${process.env.NODE_ENV} in ${PORT}`);
});
//==========================================//