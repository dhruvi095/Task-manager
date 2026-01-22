const express = require('express')
const router =  express.Router()
const {getTasks,postTasks,putTasks,getTask,deleteTask} = require('../controllers/TaskControllers')
const validateToken = require('../middleware/validateTokenHandler')
const upload = require('../middleware/upload')


router.route('/').get(validateToken,getTasks).post(validateToken, upload.single('file'),postTasks)

router.route('/:id').put(validateToken,upload.single('file'),putTasks).get(validateToken,getTask).delete(validateToken,deleteTask)

module.exports = router