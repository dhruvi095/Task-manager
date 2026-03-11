const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addSubtask,
  getSubtasks,
  updateSubtask,
  deleteSubtask,
} = require("../controllers/SubTaskControllers");

router.post("/tasks/:taskId/subtasks", upload.single("file"), addSubtask);
router.get("/tasks/:taskId/subtasks", getSubtasks);
router.put("/tasks/:taskId/subtasks/:subtaskId",  upload.single("file"),updateSubtask);
router.delete("/tasks/:taskId/subtasks/:subtaskId", deleteSubtask);

module.exports = router;
