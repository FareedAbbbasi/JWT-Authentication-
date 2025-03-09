const express = require("express")
const app = express();
const cookiesParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cookiesParser);


app.get("/", function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("passward", salt, function(err, hash) {
            console.log(hash)
        });
    });
})

app.get("/", function(req, res) {
    bcrypt.compare("passwar", "$2b$10$58Xqgp97anYSrZwNVIiTh.0PP3Ju8BXSShe.iHIKoxZXg6V1hkTc2", function(err, result) {
       console.log(result)
    });
})

app.get("/", function(req, res) {
    const token = jwt.sign({"email": "hussaninjedn"}, "hello");
    console.log(token)
    res.cookie("token", token); 
    res.send("Done");
})

app.get("/read", function(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        const data = jwt.verify(token, "hello");
        console.log("Decoded Data:", data);

        res.json({ message: "Token verified successfully", user: data });
    } catch (error) {
        console.error("Error verifying token:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
});


app.listen(3000)