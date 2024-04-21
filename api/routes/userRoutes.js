const express = require("express");
const userRouter = express.Router();
const userController = require("../controlles/userController");
const checkUserAuth = require("../middleware/auth-middleware");
const auth = require("../middleware/auth-middleware");

// create user and verify user
userRouter.use("/loggeduser", checkUserAuth);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/verify", userController.verfiyUser);

// get user Data
userRouter.get("/retrive_user/", auth, userController.getAllUser);
userRouter.get("/retrive-single_user/", auth, userController.retriveSingleUser);

module.exports = userRouter;
