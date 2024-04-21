const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected ..");
  })
  .catch((e) => {
    console.log(e, "No Connection ");
  });
