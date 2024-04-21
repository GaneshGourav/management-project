const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  dueDate: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },

  priority: {
    type: String,
    default: "low",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Jobs = mongoose.model("Task", taskSchema);
module.exports = Jobs;
