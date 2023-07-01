const config = require("config")
const express = require("express");
const Joi = require("joi");
const log = require("./middleware/logger");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const myDebugger = require("debug")("app:test")
const dbDebugger = require("debug")("app:dbDebug");
myDebugger("calling myDebugger")

dbDebugger("a message from dbDebugger debugger function")

const courses = require("./routes/courses")
const homePage = require("./routes/homePage")

// console.log("app name: ", config.get("name"));
// console.log("app mail server: ",config.get("mail.host"));
// console.log("password: ", config.get("mail.password"));

// detect the environment in which our app is running
// there is two ways
// - process.env.NODE_ENV --> undefined  by default
// - app.get("env") --> development  by default

// you can use this to set some additional functionalities based on the environment

if(app.get("env")==="development"){
  app.use(morgan("tiny"))
  console.log("morgan enabled...");
} 

app.use(express.json());

app.use(log);

app.use((req, res, next) => {
  console.log("authenticating...");
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.use("/api/courses", courses)

app.use("/", homePage)
// app.use(helmet());



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is listening on port: ", port);
});

