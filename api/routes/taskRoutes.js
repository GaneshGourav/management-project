const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controlles/taskController");
const auth = require("../middleware/auth-middleware");

taskRouter.post("/create-task", auth, taskController.createTask);
taskRouter.post("/assignedTask", auth, taskController.assignTask);
taskRouter.get("/getAssignedTask", auth, taskController.getAssignedTask);

taskRouter.put("/updateTask/:id", auth, taskController.updateTask);
taskRouter.put("/updateStatus/:id", auth, taskController.updateTaskStatus);
taskRouter.get("/retrive_task/", auth, taskController.getAllTask);
taskRouter.get("/retriveTaskById/:id", auth, taskController.getSingleTasks);
taskRouter.delete("/delete_task/:id", auth, taskController.deleteTasks);

module.exports = taskRouter;
