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

app.post("/login", (req, res) => {
	// SQL code goes here
	input = req.body
	input_email = input.email
	input_password = input.password

	// Check if user exists
	console.log(input_email)
	pool.query(`SELECT email FROM customers WHERE email ='${input_email}'`, function (err, result) {
		if (err) {
			console.log(err)
			
			res.redirect('/login')
		} else{
			if (!result[0]){
				console.log("That email does not exist")
				res.redirect('/login')
			} else {
				if (result[0].email.length > 0) {
					pool.query(`SELECT password FROM customers WHERE email ='${input_email}'`, function (err, result) {
						console.log(result)
		
						if (err) {
							console.log(err)
							res.redirect('/login')
						} 
		
						if (result[0].password == input_password){
							res.render("conation/main",
							{
								layout: "layoutLoggedIn",
								title: "Conation",
								// Result holds the rows returned by the SQL query, now you can call customers.forEach
								customers: result
							})
		
						}else {
							console.log("Passwords do not match")
							res.redirect("/login")
						}
		
					});
				}
			}
		}	
	});
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
	res.render('conation/business', {
			layout: 'layoutLoggedIn',
			title: 'fake name',
			businessName: 'fake name here',
			description: 'teiahtukjha'
	});
});

app.get('/business/:id', (req, res) => {
	pool.query(`SELECT * FROM businesses WHERE id = ${req.params.id};`, (err, result) => {
		if (err) {
			console.log(err);
		}
			res.render("conation/business", {
						layout: 'layoutLoggedIn',
						title: result[0].name,
						businessName: result[0].name,
						description: result[0].description
					});
	});
});

app.get('/update_business_info', (req, res) => {
	res.render('conation/update_business_info', { layout: 'layoutLoggedIn', title: 'Update Profile'  });
});

app.get('/main', (req, res) => {
	let query = "SELECT * FROM businesses";
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render("conation/main", {
					layout: 'layoutLoggedIn',
					title: 'conation',
					businesses: result
		})
	});
});

app.get('/map', (req, res) =>{
	res.render('conation/map', { layout: 'layoutLoggedIn', title: 'Map'})
})

app.set('views', path.join(__dirname, 'views'));

app.post('/updateBusinessProfile', (req, res) => {
	// Hard-coded username needs to be changed to pull from session
	let query = `UPDATE business_owners SET first_name = "${req.body.firstName}", last_name = "${req.body.lastName}", email = "${req.body.email}", phone = "${req.body.phone}" WHERE username = "yblague0";`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/update_business_info");
	});
});

app.post('/updateBusinessPassword', (req, res) => {
	// Hard-coded username needs to be changed to pull from session, password needs hashing
	let query = `UPDATE business_owners SET password = "${req.body.password}" WHERE username = "yblague0";`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/update_business_info");
	});
});

app.post('/updateBusinessInfo', (req, res) => {
	// Hard-coded ID needs to be changed to pull from session
	let query = `UPDATE businesses SET address = "${req.body.address}", city = "${req.body.city}", province = "${req.body.province}", category = "${req.body.category}", description = "${req.body.description}" WHERE id = 1`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/update_business_info");
	})
});


app.listen(8080, function () {
  console.log("Server running. Visit: localhost:8080 in your browser 🚀");
});