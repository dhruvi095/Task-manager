const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModels')

//Register a user
//post method POST /api/auth/register
const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("All fields are mendatory!")
    }
    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

    if (!strongPasswordRegex.test(password)) {
        res.status(400)
        throw new Error(
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
        )
    }

    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already register!")
    }

    //Hash password
    const hashedPass = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPass,
        role: role === "admin" ? "admin" : "user",
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    }
    else {
        res.status(400)
        throw new Error("User data is not valid")
    }
})

//login user
//post method POST /api/auth/login
const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fileds are mendatory!")
    }
    const user = await User.findOne({ email })

    try {
         if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                role: user.role
            }
        }, process.env.AccessToken_Secret,
            { expiresIn: "20hrs" }
        )
        res.status(200).json({
            accessToken, user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } else {
        res.status(401)
        throw new Error("Email or password is not valid!")
    } } catch (error) {
        throw new Error("Server error, please try again")
    }
})

//access current user's information
//post method POST /api/auth/current
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { RegisterUser, LoginUser, currentUser }