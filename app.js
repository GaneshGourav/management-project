const express = require("express");
require("./db/db");
const app = express();
const userRouter = require("./api/routes/userRoutes");
const taskRouter = require("./api/routes/taskRoutes.js");
const bodyParser = require("body-parser");
const auth = require("./api/middleware/auth-middleware.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");



app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
userRouter.use(express.json());
app.use("/users", userRouter);
app.use("/task", taskRouter);


const port = process.env.PORT || 4093;
app.listen(port, () => {
  console.log(`port... ${port}`);
});
