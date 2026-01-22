const express = require('express')
const router =  express.Router()
const {sendMail} = require('../controllers/sendMail')

router.get('/send_email', sendMail)

module.exports = router