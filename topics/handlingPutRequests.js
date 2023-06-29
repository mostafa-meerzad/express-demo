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
//   const schema = {
    // name: Joi.string().min(3).required(),
//   };
//   const result = Joi.validate(req.body, schema);
const {error} = validateCourse(req.body)
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
    // to update a course we need to follow the following logic

    // look up the course
    // if not existing return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // console.log()
    // console.log(course, " this is the course you are looking for")
    // console.log()
    if (!course){ res.status(404).send("course not found")
return} 

    // validate the input
    // if invalid return 400
    // const schema = {
        // name: Joi.string().min(3).required()
    // }

    // const result = Joi.validate(req.body, schema)
    const {error} = validateCourse(req.body)
    if(error) {res.status(400).send(error.details[0].message) 
        return}

    // update the course
    // return the updated course
    course.name = req.body.name
    res.send(course);

})

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

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}