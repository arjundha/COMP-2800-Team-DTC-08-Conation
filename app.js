const express = require("express")
const app = express()
const path = require('path');

var fs = require('fs');
var myCss = {
  style: fs.readFileSync('public/main.css', 'utf8')
};

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index", {
    title: "Landing Page",
    myCss: myCss
  });
})

app.get('/login', (req, res) => {
	res.render('login');
});

app.set('views', path.join(__dirname, 'views'));

app.listen(8080, function () {
  console.log("Server running. Visit: localhost:8080 in your browser 🚀");
})