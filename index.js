const mongoose=require('mongoose')
const express= require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app= express();

//My routes
const userRoutes=require("./routes/user")
//connecting to database
mongoose.connect('mongodb://localhost:27017/USER',
 {useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{
     console.log("DB CONNECTED")
 })

 //middlewares
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(cors());

 //my routes
app.use("/api",userRoutes)


 //ports
 const port =1289;

 //starting a server
 app.listen(port,()=>{
     console.log(`App is running at ${port}`)
 })