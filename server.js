const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

app.set("view engine", hbs);
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
    var now = (new Date()).toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to file....");
        }
    });
    next();
})

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear", () => {
    return (new Date()).getFullYear();
});

hbs.registerHelper("screemId", (text) => {
    return text.toUpperCase();
})

app.get("/", (request, response) => {

    response.render("home.hbs", {
        welcomeMessage: "Welcome to test",
        pageTitle : "Home Page"
    })

});

app.get("/about", (request, response) => {
    response.render("about.hbs", {
        pageTitle : "About Page"
    });
})

app.get("/bad", (request, response) => {
    response.send({errorMessage: "oops"});
})
app.listen(3000, () => {
    console.log("console is open for business....");
});