const express = require("express");
const Joi = require("joi");
const log = require("./logger");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

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
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello World");
  // res.end()
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
  // res.end()
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("course not found");
    return;
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => parseInt(req.params.id) === c.id);

  if (!course) {
    res.status(404).send("course with the given id not fund");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (course) res.send(course);
  res.status(404).send("The course with the id provided does not exists");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is listening on port: ", port);
});

// put all course validation in a function to avoid repetition

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}
