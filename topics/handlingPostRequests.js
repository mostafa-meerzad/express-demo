const express = require("express");
const app = express();

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
    const course = {
        id: courses.length + 1,
        name:req.body.name
    }
    courses.push(course);
    // By convention when we post an object to the server and the server creates that new object or resource it should return that object in the body of the response
    // just in case the client wants to see the newly created object or resource
    res.send(courses);
})


app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (course) res.send(course);
//By convention in REST APIs when someone is trying to reach a resource that doesn't exist we should respond with status-code of 404  
  res.status(404).send("The course with the id provided does not exists");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is listening on port: ", port);
});
