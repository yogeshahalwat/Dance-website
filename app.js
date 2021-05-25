const express = require("express");
const path = require("path");
const app = express();

const mongoose = require('mongoose');
const bodyparser = require("body-parser")  //not used


// step1
// connecting to db---------------------
// here contactdance is name of db
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;


// db steps---------
// step2------------
// Define moongoose schema
var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    Email: String,
    address: String

});

// step3------------
// compileing schema to model
var contact = mongoose.model('contact', contactschema);


// Exprees static Stuff
app.use("/static", express.static("static",))
app.use(express.urlencoded())
// pug specif stuff
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))


// Endpoints
app.get("/", (req, res) => {
    const params = {}
    res.status(200).render("home.pug", params)
})
app.get("/contact", (req, res) => {
    const params = {}
    res.status(200).render("contact.pug", params)
})


// step4-------------
// if anybody put a request on contact
app.post("/contact", (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {

        res.send("Data Saved")
    }).catch(() => {
        res.status(400).send("Not Saved")
    });

    // res.status(200).render("contact.pug")
})

// start the serverr
app.listen(port, () => {
    console.log(`The application is started successfully on port ${port}`);
})



