const mongoose = require("mongoose");

const dburl = process.env.MONGOURL || `mongodb+srv://mrganeshofficial:${process.env.PASS}@cluster0.lonryxe.mongodb.net/taskManager`

mongoose
  .connect(dburl, {
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
