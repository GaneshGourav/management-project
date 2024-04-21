const mongoose = require("mongoose");
require("dotenv").config()

const dburl = process.env.MONGOURL || `mongodb://localhost:27017/taskManager`

mongoose
  .connect("mongodb+srv://mrganeshofficial:Ganesh622314@cluster0.lonryxe.mongodb.net/taskManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4
  })
  .then(() => {
    console.log("connected ..");
  })
  .catch((e) => {
    console.log(e, "No Connection ");
  });
