// Dependencies
const express = require("express");
const mysql = require("mysql2");
const favicon = require("serve-favicon");
const path = require('path');
const ejsLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');

// Set stuff here
const 	app = express();
		app.use(express.urlencoded({extended: true}));
		app.use(express.static(__dirname + "/public"));
		app.set("view engine", "ejs");
		app.use(ejsLayouts);
		app.use(favicon(path.join(__dirname, "public", "src", "images", "favicon.ico")));
		app.set('views', path.join(__dirname, 'views'));

// Database connection
const pool = mysql.createPool({
		host: 'conation.cxw3qdgdl2eg.us-west-2.rds.amazonaws.com',
		user: 'conationadmin',
		database: 'conation',
		password: 'secret1234'
	}).promise();

	
// === Database Testing ===

// Connect to database
const db = mysql.createConnection({
    host     : 'conation.cxw3qdgdl2eg.us-west-2.rds.amazonaws.com',
    user     : 'conationadmin',
    password : 'secret1234',
    database : 'conation'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected');
});

// Reading from the database
app.get("/db_test", (req, res) => {
	// SQL code goes here
	let query = "SELECT * FROM businesses;";
	db.query(query, (err, result) => {
		if (err) {
			res.redirect("/db_test");
		}
		res.render("conation/db_test", 
			{layout: "layoutLoggedOut", 
			title: "Conation", 
			// Result holds the rows returned by the SQL query, now you can call businesses.forEach
			businesses: result})});
});

// Writing to the database
app.post("/db_test", (req, res) => {
	let input = req.body;
	// SQL code goes here, using name values from the form
	let query = "INSERT INTO businesses (`name`, `description`, `address`, city, province, category) VALUES ('" +
		input.name + "', '" + input.description + "', '" + input.address + "', '" + input.city + "', '" + input.province + "', '" + input.category + "');";
	db.query(query, (err, result) => {
		if (err) {
			return res.status(500).send(err);
		}
		// Redirect URL on success
		res.redirect('/db_test');});
});

// === Database Testing ===

app.get("/", function (req, res) {
  res.render("conation/index", { layout: 'layoutLoggedOut', title: 'Conation' });
})

app.get('/login', (req, res) => {
	res.render('conation/login', { layout: 'layoutLoggedOut', title: 'Log-In'  });
});

app.get('/registration', (req, res) => {
	res.render('conation/registration', { layout: 'layoutLoggedOut', title: 'Registration'  });
});

app.get('/customer_registration', (req, res) => {
	res.render('conation/customer_registration', { layout: 'layoutLoggedOut', title: 'Customer Registration'  });
});

app.get('/business_registration', (req, res) => {
	res.render('conation/business_registration', { layout: 'layoutLoggedOut', title: 'Business Registration'  });
});

app.get('/about', (req, res) => {
	res.render('conation/about', { layout: 'layoutLoggedOut', title: 'About Us'  });
});

app.get('/business', (req, res) => {
	res.render('conation/business', { layout: 'layoutLoggedIn', title: 'SEND NAME OF BUSINESS HERE (USE REQ?)'  });
});
app.get('/update_business_info', (req, res) => {
	res.render('conation/update_business_info', { layout: 'layoutLoggedIn', title: 'Update Profile'  });
});

app.get('/main', (req, res) => {
	res.render('conation/main', { layout: 'layoutLoggedIn', title: 'conation'  });
});

app.get('/map', (req, res) =>{
	res.render('conation/map', { layout: 'layoutLoggedIn', title: 'Map'})
})


app.set('views', path.join(__dirname, 'views'));

app.listen(8080, function () {
  console.log("Server running. Visit: localhost:8080 in your browser 🚀");
});