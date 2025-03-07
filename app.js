const express = require("express")
const app = express();
const cookiesParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cookiesParser);


// app.get("/", function(req, res) {
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash("passward", salt, function(err, hash) {
//             console.log(hash)
//         });
//     });
// })

// app.get("/", function(req, res) {
//     bcrypt.compare("passwar", "$2b$10$58Xqgp97anYSrZwNVIiTh.0PP3Ju8BXSShe.iHIKoxZXg6V1hkTc2", function(err, result) {
//        console.log(result)
//     });
// })

app.get("/", function(req, res) {
    const token = jwt.sign({"email": "hussaninjedn"}, "hello");
    console.log(token)
    res.cookie("token", token); 
    res.send("Done");
})

app.get("/read", function(req, res) {
    console.log(req.cookies.token)
})

app.get("/read", function(req, res) {
    let data = jwt.verify(req.cookies.token, "hello")
    console.log(data)
})

app.listen(3000)