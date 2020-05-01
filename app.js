const express = require("express")
const app = express()
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index");
})

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/registration', (req, res) => {
	res.render('registration');
});

app.get('/customer_registration', (req, res) => {
	res.render('customer_registration');
});

app.get('/business_registration', (req, res) => {
	res.render('business_registration');
});

app.get('/business', (req, res) => {
	res.render('business');
});
app.get('/update_business_info', (req, res) => {
	res.render('update_business_info');
});

app.get('/main', (req, res) => {
	res.render('main');
});

app.set('views', path.join(__dirname, 'views'));

app.listen(8080, function () {
  console.log("Server running. Visit: localhost:8080 in your browser 🚀");
})