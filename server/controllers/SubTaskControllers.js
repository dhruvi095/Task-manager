const asyncHandler = require("express-async-handler");
const Tasks = require("../models/taskModels");


//   ADD SUBTASK
//  POST /api/tasks/:taskId/subtasks
const addSubtask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Tasks.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  const subtask = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || "pending",
    priority: req.body.priority || "low",
    dueDate: req.body.dueDate,
    file: req.file ? req.file.filename : null,
  };

  task.subtasks.push(subtask);
  await task.save();

  res.status(201).json({
    message: "Subtask added successfully",
    subtasks: task.subtasks,
  });
});

//  get all subtasks
//  GET /api/tasks/:taskId/subtasks
const getSubtasks = asyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.taskId).select("subtasks");

  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  res.status(200).json(task.subtasks);
});

// update subtask
//  PUT /api/tasks/:taskId/subtasks/:subtaskId
const updateSubtask = asyncHandler(async (req, res) => {
  const { taskId, subtaskId } = req.params;

  const task = await Tasks.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  const subtask = task.subtasks.id(subtaskId);
  if (!subtask) {
    res.status(404);
    throw new Error("Subtask not found!");
  }

  Object.assign(subtask, req.body);

  if (req.file) {
    subtask.file = req.file.filename;
  }

  await task.save();

  res.json({
    message: "Subtask updated successfully",
    subtask,
  });
});


// delete subtask
//  DELETE /api/tasks/:taskId/subtasks/:subtaskId
const deleteSubtask = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Only admin can delete subtask!");
  }

  const { taskId, subtaskId } = req.params;

  const task = await Tasks.findById(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  const subtask = task.subtasks.id(subtaskId);
  if (!subtask) {
    res.status(404);
    throw new Error("Subtask not found!");
  }

  subtask.deleteOne();
  await task.save();

  res.json({ message: "Subtask deleted successfully" });
});

module.exports = {
  addSubtask,
  getSubtasks,
  updateSubtask,
  deleteSubtask,
};
