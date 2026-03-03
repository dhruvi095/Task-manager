const mongoose = require("mongoose");
const { Schema } = mongoose;

const subTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    required:true
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true
  },

  dueDate: {
    type: Date,
    required: true
  },

  file: {
    type: String,
  }

}, { timestamps: true });

module.exports = subTaskSchema;