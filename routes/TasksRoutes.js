const express = require('express')
const router =  express.Router()
const {getTasks,postTasks,putTasks,getTask,deleteTask} = require('../controllers/TaskControllers')
const validateToken = require('../middleware/validateTokenHandler')


router.route('/').get(validateToken,getTasks).post(validateToken,postTasks)

router.route('/:id').put(validateToken,putTasks).get(validateToken,getTask).delete(validateToken,deleteTask)

module.exports = router