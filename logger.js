function log(req, res, next) {
    console.log("logging...");
    // console.log("logging the req object");
    // console.log(req);
    // console.log("----------------------------------");
    // console.log("logging res object");
    // console.log(req);
    // console.log("----------------------------------");
    next()
}

module.exports = log