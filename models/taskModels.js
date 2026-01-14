const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const taskSchema = mongoose.Schema({ 
     title : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    trim:true,
  },
  status : {
    type : String,
    enum : ["pending" , "in_progress" , "completed"],
    required : true
  },
  priority : {
    type : String,
    enum : ["low" , "medium" , "high"],
    required : true
  },
  dueDate : {
    type : Date,
    required : true
  },
  user : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required: true,
  }
} ,{timestamps:true})

module.exports = mongoose.model("task",taskSchema)

