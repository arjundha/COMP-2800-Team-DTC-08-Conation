// Dependencies
const express = require("express");
const mysql = require("mysql2");
const favicon = require("serve-favicon");
const path = require('path');
const ejsLayouts = require("express-ejs-layouts");

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

app.post('updateBusinessProfile', (req, res) => {
	console.log("I did it");

	pool.execute(`UPDATE business_owners 
							SET first_name = ${req.body.firstName},
								last_name = ${req.body.lastName},
								email = ${req.body.email},
								phone = ${req.body.phone}
							WHERE username = ${req.body.username}`) // SHOULD BE ID BASED?
		.then(data => res.json( {success : true} ))
		.catch(error => res.json( {success : false} ));
});

app.post('updateBusinessPassword', (req, res) => {
	pool.execute(`UPDATE business_owners 
							SET password = ${req.body.password}
							WHERE username = ${req.body.username}`) // SHOULD BE ID BASED AND PASSWORD NEEDS HASHING.
		.then(data => res.json( {success : true} ))
		.catch(error => res.json( {success : false} ));
});

app.post('updateBusinessInfo', (req, res) => {
	pool.execute(`UPDATE businesses
							SET address = ${req.body.address},
								address2 = ${req.body.address2},
								city = ${req.body.city},
								province = ${req.body.province},
								postal = ${req.body.postal},
								category = ${req.body.category},
								description = ${req.body.description}
							WHERE business_id = ${req.body.username}`) // SHOULD BE ID BASED?
		.then(data => res.json( {success : true} ))
		.catch(error => res.json( {success : false} ));
});


app.listen(8080, function () {
  console.log("Server running. Visit: localhost:8080 in your browser 🚀");
});