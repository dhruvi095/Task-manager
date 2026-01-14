const express =   require('express')
const { RegisterUser, LoginUser, currentUser } = require('../controllers/AuthControllers')
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router()

router.post("/register", RegisterUser)

router.post("/login",LoginUser)

router.get("/current",validateToken,currentUser)

module.exports = router