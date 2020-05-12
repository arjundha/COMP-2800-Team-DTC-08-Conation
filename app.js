// ------------------------- //
//       DEPENDENCIES        //
// ------------------------- //

const express = require("express");
const mysql = require("mysql2");
const favicon = require("serve-favicon");
const path = require('path');
const ejsLayouts = require("express-ejs-layouts");
const bcrypt = require('bcrypt');
const app = express();


// ------------------------- //
//        MIDDLEWARE         //
// ------------------------- //

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(favicon(path.join(__dirname, "public", "src", "images", "favicon.ico")));
app.set('views', path.join(__dirname, 'views'));


// ------------------------- //
//        CONNECTION         //
// ------------------------- //

const pool = mysql.createPool({
	host: 'conation.cxw3qdgdl2eg.us-west-2.rds.amazonaws.com',
	user: 'conationadmin',
	database: 'conation',
	password: 'secret1234'
}).promise();


// ------------------------- //
//    SIMPLE PAGE RENDERS    //
// ------------------------- //


app.get("/", function (req, res) {
	res.render("conation/index", { layout: 'layoutLoggedOut', title: 'Conation' });
})

app.get('/login', (req, res) => {
	res.render('conation/login', { layout: 'layoutLoggedOut', title: 'Log-In' });
});

app.get('/registration', (req, res) => {
	res.render('conation/registration', { layout: 'layoutLoggedOut', title: 'Registration' });
});

app.get('/customer_registration', (req, res) => {
	res.render('conation/customer_registration', { layout: 'layoutLoggedOut', title: 'Customer Registration' });
});

app.get('/business_registration', (req, res) => {
	res.render('conation/business_registration', { layout: 'layoutLoggedOut', title: 'Business Registration' });
});

app.get('/about', (req, res) => {
	res.render('conation/about', { layout: 'layoutLoggedOut', title: 'About Us' });
});

app.get('/map', (req, res) => {
	res.render('conation/map', { layout: 'layoutLoggedIn', title: 'Map' })
});


// ------------------------- //
//  SIMPLE DATABASE QUERIES  //
// ------------------------- //

// Get Emails for validation
app.get('/getEmails', (req, res) => {
	console.log("Hello");
	pool.query('SELECT email FROM customers', function (err, result) {
		res.json(result);
	})

})

// Used to display map information
app.get('/getBusinesses', (req, res) => {
	console.log("Business");
	// SELECT `name`, description, lat, `long`, mon, tue, wed, thu, fri, sat sun FROM business_hours JOIN businesses ON businesses.id = business_hours.business_id;
	pool.query('SELECT `name`, description, address, city, province, category, postal_code, lat, lng , mon, tue, wed, thu, fri, sat, sun FROM business_hours JOIN businesses ON businesses.id = business_hours.business_id;', function (err, result) {
		console.log("Getting data")
		console.log(result)
		res.json(result);
	})
})



// ------------------------- //
// COMPLEX DATABASE QUERIES  //
// ------------------------- //


// LOGIN //

app.post("/login", (req, res) => {
	// SQL code goes here
	input = req.body
	input_email = input.email
	input_password = input.password

	// Check if user exists
	pool.query(`SELECT email FROM customers WHERE email ='${input_email}' UNION SELECT email FROM business_owners WHERE email ='${input_email}'`, function (err, result) {
		if (err) {
			console.log(err)

			res.redirect('/login')
		} else {
			if (!result[0]) {
				console.log("That email does not exist")
				res.redirect('/login')
			} else {
				if (result[0].email.length > 0) {
					pool.query(`SELECT password FROM customers WHERE email ='${input_email}' UNION SELECT password FROM business_owners WHERE email ='${input_email}'`, function (err, result) {
						if (err) {
							console.log(err)
							res.redirect('/login')

						} else {
							console.log(result)
							bcrypt.compare(input_password, result[0].password, function (err, result) {
								if (result) {
									pool.query(`SELECT first_name, last_name, email FROM customers WHERE email ='${input_email}'`, function (err, result) {
										if (err) {
											console.log(err)
											res.redirect('/login')

										} else {
											res.redirect("/main")
										}
									})
								} else {
									console.log("Passwords do not match")
									res.redirect("/login")
								}
							});
						}
					});
				}
			}
		}
	});
});


// CUSTOMER REGISTRATION //

app.post('/customer_registration', (req, res) => {
	input = req.body
	password1 = input.password
	password2 = input.password2
	email = input.email
	phone = input.phone
	firstName = input.firstName
	lastName = input.lastName

	pool.query(`SELECT email FROM customers WHERE email ='${email}' UNION SELECT email FROM business_owners WHERE email ='${email}'`, function (err, result) {
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		} else {
			if (result[0]) {
				console.log(result)
				console.log("That email already exists")
				res.redirect('/customer_registration')
			} else {
				// Hash Password
				let hashedPassword = bcrypt.hashSync(password1, 10);

				// SQL code goes here, using name values from the form
				let query = `INSERT INTO customers (password, first_name, last_name, email, phone) VALUES ('${hashedPassword}', '${firstName}', '${lastName}', '${email}', '${phone}');`;
				pool.query(query, (err, result) => {
					if (err) {
						console.log(err)
						return res.status(500).send(err);
					}
					// Redirect URL on success
					console.log(result)
					res.render("conation/login",
						{
							layout: "layoutLoggedOut",
							title: "Conation",
						})
				});
				res.redirect('/login')

			}
		}
	})



})

// CUSTOMER REGISTRATION //


app.post('/business_registration', (req, res) => {
	let input = req.body;
	let email = input.email;
	let password1 = input.password;
	let password2 = input.password2;
	let firstName = input.firstName;
	let lastName = input.lastName;
	let phone = input.phone;
	let businessName = input.businessName;
	let address = input.address;
	let address2 = input.address2;
	let city = input.city;
	let prov = input.prov;
	let postalCode = input.zip;
	let lat = input.lat;
	let lng = input.long;
	let description = input.description;
	let tag = input.tag;
	let mon;
	let tue;
	let wed;
	let thu;
	let fri;
	let sat;
	let sun;
	
	if (input.monClosed) {
		mon = "Closed";
	} else if (input.mon24) {
		mon = "24 hours";
	} else {
		mon = input.monOpen + " - " + input.monClose;
	}
	if (input.tueClosed) {
		tue = "Closed";
	} else if (input.tue24) {
		tue = "24 hours";
	} else {
		tue = input.tueOpen + " - " + input.tueClose;
	}
	if (input.wedClosed) {
		wed = "Closed";
	} else if (input.wed24) {
		wed = "24 hours";
	} else {
		wed = input.wedOpen + " - " + input.wedClose;
	}
	if (input.thuClosed) {
		thu = "Closed";
	} else if (input.thu24) {
		thu = "24 hours";
	} else {
		thu = input.thuOpen + " - " + input.thuClose;
	}
	if (input.friClosed) {
		fri = "Closed";
	} else if (input.fri24) {
		fri = "24 hours";
	} else {
		fri = input.friOpen + " - " + input.friClose;
	}
	if (input.satClosed) {
		sat = "Closed";
	} else if (input.sat24) {
		sat = "24 hours";
	} else {
		sat = input.satOpen + " - " + input.satClose;
	}
	if (input.sunClosed) {
		sun = "Closed";
	} else if (input.sun24) {
		sun = "24 hours";
	} else {
		sun = input.sunOpen + " - " + input.sunClose;
	}


	pool.query(`SELECT email FROM customers WHERE email ='${email}' UNION SELECT email FROM business_owners WHERE email ='${email}'`, function (err, result) {
		if (err) {
			console.log(err)
			return res.status(500).send(err);
		} else {
			if (result[0]) {
				console.log(result);
				console.log("That email already exists");
				res.redirect('/business_registration');
			} else {
				// Hash Password
				let hashedPassword = bcrypt.hashSync(password1, 10);

				// Creates business, owner, and hours
				let procedureCall = `CALL create_business_owner_with_business ("${email}", "${hashedPassword}", "${firstName}", "${lastName}", "${phone}", "${businessName}", "${address}", "${address2}", "${city}", "${prov}", "${postalCode}", ${lat}, ${lng}, "${description}", "${tag}", "${mon}", "${tue}", "${wed}", "${thu}", "${fri}", "${sat}", "${sun}");`;
				pool.query(procedureCall, (err, results) => {
					if (err) {
						console.log(err);
						return res.status(500).send(err);
					} else {
						res.render("conation/login", {layout: "layoutLoggedOut", title: "Conation"});
					}
				});
			}
		}
	});



})



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
	res.render('conation/update_business_info', { layout: 'layoutLoggedIn', title: 'Update Profile' });
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


app.post('/businessSearch', (req, res) => {
	let query = `SELECT * FROM businesses WHERE name LIKE '%${req.body.search}%';`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render("conation/main", {
			layout: 'layoutLoggedIn',
			title: 'conation',
			businesses: result
		});
	});
});

app.post('/businessType', (req, res) => {
	let query = `SELECT * FROM businesses ORDER BY category ASC, name ASC;`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render("conation/main", {
			layout: 'layoutLoggedIn',
			title: 'conation',
			businesses: result
		});
	});
});

/*app.post('/businessOpenNow', (req, res) => {
	let query = `SELECT * FROM businesses WHERE`; // INSERT CODE TO CHECK IF OPEN
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.render("conation/main", {
			layout: 'layoutLoggedIn',
			title: 'conation',
			businesses: result
		});
	});
});*/

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
	let hashedPassword = bcrypt.hashSync(req.body.password, 10);
	let query = `UPDATE business_owners SET password = "${hashedPassword}" WHERE username = "yblague0";`;
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

app.post("/updateBusinesshours", (req, res) => {
	let input = req.body;
	let mon;
	let tue;
	let wed;
	let thu;
	let fri;
	let sat;
	let sun;
	
	if (input.monClosed) {
		mon = "Closed";
	} else if (input.mon24) {
		mon = "24 hours";
	} else {
		mon = input.monOpen + " - " + input.monClose;
	}
	if (input.tueClosed) {
		tue = "Closed";
	} else if (input.tue24) {
		tue = "24 hours";
	} else {
		tue = input.tueOpen + " - " + input.tueClose;
	}
	if (input.wedClosed) {
		wed = "Closed";
	} else if (input.wed24) {
		wed = "24 hours";
	} else {
		wed = input.wedOpen + " - " + input.wedClose;
	}
	if (input.thuClosed) {
		thu = "Closed";
	} else if (input.thu24) {
		thu = "24 hours";
	} else {
		thu = input.thuOpen + " - " + input.thuClose;
	}
	if (input.friClosed) {
		fri = "Closed";
	} else if (input.fri24) {
		fri = "24 hours";
	} else {
		fri = input.friOpen + " - " + input.friClose;
	}
	if (input.satClosed) {
		sat = "Closed";
	} else if (input.sat24) {
		sat = "24 hours";
	} else {
		sat = input.satOpen + " - " + input.satClose;
	}
	if (input.sunClosed) {
		sun = "Closed";
	} else if (input.sun24) {
		sun = "24 hours";
	} else {
		sun = input.sunOpen + " - " + input.sunClose;
	}
	// Hard-coded ID needs to be changed to pull from session
	let query = `UPDATE business_hours SET mon = "${mon}", tue = "${tue}", wed = "${wed}", thu = "${thu}", fri = "${fri}", sat = "${sat}", sun = "${sun}" WHERE business_id = 32;`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.redirect("/update_business_info");
	});
});

var port = process.env.port || 8080;

app.listen(port);