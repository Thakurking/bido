if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const index = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const createError = require("http-errors");
const helmet = require("helmet");
require("./helper/redis_helper");

//Added Helmet for express
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//Parser Cookie
app.use(cookieParser());

app.use(express.static("public"));

app.use(morgan("dev"));

app.use("/", index);

app.use(async (req, res, next) => {
  next(createError.NotFound("PAGE NOT FOUND"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//===========mongoDB Connection==============//
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`mongoDB Disconnected on: ${conn.connection.host}

    ||||||||||||||||||||||||||||||||||||||
    |      BHARAT SOFTWARE SYSTEMS V0.0  |
    |  =========   =========  =========  |  
    |  ||     ||   ||         ||         |
    |  ||     ||   ||         ||         |
    |  ||     ||   ||         ||         |
    |  ||=====     =========  =========  |
    |  ||=====            ||         ||  |
    |  ||     ||          ||         ||  |
    |  ||     ||          ||         ||  |
    |  ||     ||   =========  =========  |
    |  =========                         |          
    ||||||||||||||||||||||||||||||||||||||`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
connectDB();
//===========================================//

//============PORT Connection===============//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server crashed on ${process.env.NODE_ENV} in ${PORT}`);
});
//==========================================//
