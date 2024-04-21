const TaskSachema = require("../models/task.js");
const { verifyAuthToken } = require("../services/commonService.js");
const {
  getTask,
  getTaskById,
  createTasks,
  assignedTask,
  getAssignTask,
  updateTasks,
  deleteTask,
  updateTasksStatus,
} = require("../services/taskService.js");
const { failAction, successAction } = require("../utils/response.js");

const createTask = async (req, res) => {
  const { data } = req.body;
  const tokens = req.header("x-access-token");

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await createTasks(authData, data);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const assignTask = async (req, res) => {
  const { data } = req.body;
  const tokens = req.header("x-access-token");

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await assignedTask(authData, data);
    res.status(200).json(successAction(result, "Task Assigned Successfull!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const getAssignedTask = async (req, res) => {
  const tokens = req.header("x-access-token");
  const params = req.query;

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await getAssignTask(authData.id, params);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const getAllTask = async (req, res) => {
  const tokens = req.header("x-access-token");
  const params = req.query;

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await getTask(authData.id, params);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const getSingleTasks = async (req, res) => {
  const id = req.params.id;
  const tokens = req.header("x-access-token");
  try {
    const authData = await verifyAuthToken(tokens);
    const result = await getTaskById(authData.id, id);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { data } = req.body;
  const tokens = req.header("x-access-token");

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await updateTasks(authData.id, id, data);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const updateTaskStatus = async (req, res) => {
  const id = req.params.id;
  const { data } = req.body;
  const tokens = req.header("x-access-token");

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await updateTasksStatus(authData.id, id, data);
    res.status(200).json(successAction(result, "Status Updated Successfull!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const deleteTasks = async (req, res) => {
  const jobsId = req.params.id;
  const tokens = req.header("x-access-token");

  try {
    const authData = await verifyAuthToken(tokens);
    const result = await deleteTask(authData.id, jobsId);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

module.exports = {
  createTask,
  assignTask,
  getAllTask,
  updateTask,
  getSingleTasks,
  deleteTasks,
  getAssignedTask,
  updateTaskStatus,
};
