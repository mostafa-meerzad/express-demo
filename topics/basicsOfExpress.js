const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Hello world !!!")
})

app.get("/api/courses", (req, res)=> {
    res.send([1,2,4,5,6])
})

// ------------------------ route parameters --------------------
// route parameters are used to capture values at specific parts of url
// also used to get required values in the url

// api/courses/1 the end-point we are trying to make
app.get("/api/courses/:id", (req, res) => {
    res.send(req.params.id)
})

// app.get("/api/blog/:year/:month", (req, res) => {
    // res.send(req.params)
// })

// --------------------- query string parameters -----------------
//  query string parameters are used to get optional values and to provide more information to backend services
app.get("/api/blog/", (req, res) => {
    res.send(req.query)
})
// process.env.PORT = 4000

const port = process.env.PORT || 3000
// console.log(process.env.PORT)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
