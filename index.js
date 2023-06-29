const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

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
  // As a security concern you should always validate what the client sends to the backend
  // basic validation
  // if(!req.body.name || req.body.name.length < 3){
  // res.status(400).send("name is required and should be at least 3 characters")
  // return;
  // }
  // Advanced validation

  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);
  // this is where the error message is stored in joi
  // console.log(result.error.details[0].message)
  // console.log(result.error)
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
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
