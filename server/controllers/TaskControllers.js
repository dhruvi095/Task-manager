const asyncHandler = require('express-async-handler')
const Tasks = require('../models/taskModels')

//for get all tasks
//get method GET /api/tasks/
// GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { title, sort, status, priority ,from_Date,to_Date} = req.query;

  const queryObject = {};
  if (req.user.role !== "admin") {
    queryObject.user = req.user._id;
  }
if(title){
    queryObject.title = { $regex: title.trim(), $options: "i" };
  }

if(from_Date && !to_Date ){
  queryObject.dueDate = { $gte: new Date(from_Date) };  
}else if(from_Date && to_Date){
  queryObject.dueDate = { $gte: new Date(from_Date), $lte: new Date(to_Date) };
}else if(!from_Date && to_Date){
  queryObject.dueDate = { $lte: new Date(to_Date) };
}

if (status) {
  queryObject.status = { $regex: `^${status}$`, $options: "i" };
}
if (priority) {
  queryObject.priority = { $regex: `^${priority}$`, $options: "i" };
}
  const sortOrder = sort === "desc" ? -1 : 1;
  const totalTasks = await Tasks.countDocuments(queryObject);
  const tasks = await Tasks.find(queryObject)
    .sort({ dueDate: sortOrder })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
       totalTasks,
    totalPages: Math.ceil(totalTasks / limit),
    currentPage: page,
    tasks,
  });
});


//for create task
//post method POST /api/tasks/
const postTasks = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { title, description, status, priority, dueDate } = req.body;
  const task = await Tasks.create({
    title,
    description,
    status: status.toLowerCase().replace(" ", "_"),
    priority: priority.toLowerCase(),
    dueDate,
    user: req.user._id,
  });

  res.status(201).json(task);
});


//for update task by id
//put method PUT /api/tasks/:id
const putTasks = asyncHandler(async (req, res) => {
    const task = await Tasks.findById(req.params.id)
    if (!task) {
        res.status(404)
        throw new Error("Task not found!")
    }
    
     if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You don't have permission to update this task!");
  }

    const updatedTask = await Tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(updatedTask)
})

//for get task by id
//get method GET /api/tasks/:id
const getTask = asyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  if (
    req.user.role !== "admin" &&
    task.user.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("You don't have permission to view this task!");
  }

  res.json(task);
});


//delete task by id 
//put method DELETE /api/tasks/:id                                                                                                                                                                                                                                                    
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Tasks.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found!");
  }

  if (
    req.user.role !== "admin" &&
    task.user.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("You don't have permission to delete this task!");
  }

  await task.deleteOne();
  res.json({ message: "Task deleted successfully" });
});


module.exports = { getTasks, postTasks, putTasks, getTask, deleteTask }