require("dotenv").config({ path: "./.env" });
const express = require("express");
require("./db/db");
const app = express();
const userRouter = require("./api/routes/userRoutes");
const taskRouter = require("./api/routes/taskRoutes.js");
const bodyParser = require("body-parser");
const auth = require("./api/middleware/auth-middleware.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");


app.use((req, res, next) => {
  const allowedOrigins = [
    
    "http://localhost:4200",
    "https://management-project-iq4n.onrender.com",  
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
userRouter.use(express.json());
app.use("/users", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 4093;
app.listen(port, () => {
  console.log(`port... ${port}`);
});
