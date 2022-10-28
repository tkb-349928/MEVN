const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//creat out express app
const app = express();

//Handle CORS + Middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,HEAD.OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers","auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Database stuff
mongoose
	.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
	.then(() => console.log("Database connected"))
	.catch((err) => console.log(err))
app.use(bodyParser.json());

//routes
app.get("/",(req,res)=>{
    res.send("Here at Home Page!");
});
const TodosRoute = require('./routes/Todos');
  app.use('/todos', TodosRoute)

//start server
app.listen(PORT,()=>{
    console.log("Server running on PORT: " + PORT);
});