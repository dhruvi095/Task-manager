const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection'); 
const dotenv = require('dotenv').config();
const cors = require('cors')
const path = require('path');
// const upload = require('./middleware/upload');
connectDB() 
const app = express()
const port = process.env.PORT || 5000
 
const corsOption= {
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,PATCH,DELETE,HEAD",
    Credential:true,
}

app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({extended:true}))   
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
// app.use(upload)

app.use("/api/tasks", require("./routes/TasksRoutes"))
app.use("/", require("./routes/sendemailRoutes"))
app.use("/api/auth", require("./routes/AuthRoutes"))

app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server starting on http://localhost:${port}`)
})