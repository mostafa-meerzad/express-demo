const express = require("express");
const Joi = require("joi");
const log = require("./logger");
const app = express();
app.use(express.json());

// make a custom middleware
// app.use((req, res, next) => {
//   console.log("logging...")
// })
// add a middleware that is in a separate file
app.use(log)
// for best practice we should separate our custom middleware functions in their own files
app.use((req, res, next) => {
  console.log("authenticating...")
  next()
})

// add middleware to get html-form data 
app.use(express.urlencoded({ extended: true }))

// add middleware to host static files 
app.use(express.static("./public"))
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

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
