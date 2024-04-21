const TaskSachema = require("../models/task.js");
const TaskAssignment = require("../models/assignedTask.js");
const { isUserExist } = require("./dbService.js");

module.exports = {
  getTask,
  getTaskById,
  createTasks,
  assignedTask,
  getAssignTask,
  updateTasks,
  deleteTask,
  updateTasksStatus,
};

// function to get All Task
async function getTask(id, params) {
  return new Promise(async function (resolve, reject) {
    const pageNumber = parseInt(params.page) || 1;
    const itemsPerPage = parseInt(params.count) || 10;

    const sortOptions = {};
    if (params.sortBy) {
      sortOptions[params.sortBy] = params.sortOrder === "desc" ? -1 : 1;
    }
    try {
      if (id) {
        const getAllTask = await TaskSachema.find({
          userId: id,
        })
          .sort(sortOptions)
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);

        if (!getAllTask) {
          return reject("No Records Found!");
        }

        const result = {
          totalCount: getAllTask.length,
          page: pageNumber,
          count: itemsPerPage,
          data: getAllTask,
        };
        return resolve(result);
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// function to Create Task
async function createTasks(id, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      if (await isUserExist(id.id)) {
        if (
          !payload.userId ||
          !payload.title ||
          !payload.dueDate ||
          !payload.description
        ) {
          return reject("All fields are required");
        } else {
          const createTasksData = await TaskSachema.create(payload);
          return resolve(createTasksData);
        }
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// function to Assigned Task
async function assignedTask(id, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      if (await isUserExist(id.id)) {
        if (!payload.userId || !payload.taskId) {
          return reject("All fields are required");
        } else {
          const createAssignedTask = await TaskAssignment.create(payload);
          return resolve(createAssignedTask);
        }
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// function to Get Assigned Task
async function getAssignTask(id, params) {
  return new Promise(async function (resolve, reject) {
    const pageNumber = parseInt(params.page) || 1;
    const itemsPerPage = parseInt(params.count) || 10;

    const sortOptions = {};
    if (params.sortBy) {
      sortOptions[params.sortBy] = params.sortOrder === "desc" ? -1 : 1;
    }
    try {
      if (id) {
        const assignments = await TaskAssignment.find({
          userId: id,
        });

        const tasks = await TaskSachema.find({
          _id: { $in: assignments.map((a) => a.taskId) },
        })
          .sort(sortOptions)
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage);

        if (!tasks) {
          return reject("No Records Found!");
        }

        const result = {
          totalCount: tasks.length,
          page: pageNumber,
          count: itemsPerPage,
          data: tasks,
        };
        return resolve(result);
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// function to Update Task
async function updateTasks(isUserExists, id, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      if (await isUserExist(isUserExists)) {
        const updatetask = await TaskSachema.findOneAndUpdate(
          { _id: id },
          { $set: payload },
          { new: true }
        );

        if (!updatetask) {
          return reject("Something went wrong");
        }

        return resolve(updatetask);
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

// function to Update Task
async function updateTasksStatus(isUserExists, id, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      if (await isUserExist(isUserExists)) {
        if (payload.priority || payload.status) {
          const updatetask = await TaskSachema.findOneAndUpdate(
            { _id: id },
            { $set: payload },
            { new: true }
          );

          if (!updatetask) {
            return reject("Something went wrong");
          }

          return resolve(updatetask);
        } else {
          return reject("please added the required Field");
        }
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

//funtion to delete Task
async function deleteTask(isUserExists, id) {
  return new Promise(async function (resolve, reject) {
    try {
      if (await isUserExist(isUserExists)) {
        const deletedTasks = await TaskSachema.deleteOne({ _id: id });

        if (!deletedTasks) {
          return reject("Jobs Not Found");
        }

        return resolve(deletedTasks);
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}

//funtion to get Task By Id
async function getTaskById(isUserExists, id) {
  return new Promise(async function (resolve, reject) {
    try {
      if (await isUserExist(isUserExists)) {
        const retriveTasks = await TaskSachema.findOne({
          _id: id,
        });

        if (!retriveTasks) {
          return reject("Task Not Found");
        }

        return resolve(retriveTasks);
      } else {
        return reject("No user found!");
      }
    } catch (error) {
      return reject(error);
    }
  });
}
