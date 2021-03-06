// ========================= //
// ------------------------- //
//       DEPENDENCIES        //
// ------------------------- //

const express = require("express");

const mysql = require("mysql2");
const favicon = require("serve-favicon");
const path = require('path');
const ejsLayouts = require("express-ejs-layouts");
const bcrypt = require('bcrypt');
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
	dest: "public/src/images/temp"
  });

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
//    SESSIONS + COOKIES     //
// ------------------------- //


app.use(session({
	name: "idk",
	secret: "secret",
	resave: true,
	saveUninitialized: true,
}));


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
	console.log(req.session)
	console.log(req.session.cookie.maxAge);
	if (req.session.acct == "customer") {
		res.render("conation/index", {
			layout: 'layoutLoggedIn',
			title: 'Conation',
			email: req.session.user,
		})
	} else if (req.session.acct == "business") {
		res.render("conation/index", {
			layout: 'layoutBusinessOwner',
			title: 'Conation',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.render("conation/index", { layout: 'layoutLoggedOut', title: 'Conation' });
	}
});

app.get('/login', (req, res) => {
	// Log User Out
	req.session.destroy();
	res.render('conation/login', { layout: 'layoutLoggedOut', title: 'Log In' });
});

app.get('/easteregg', (req, res) => {
	if (req.session.acct == "customer") {
		res.render("conation/easteregg", {
			layout: 'layoutLoggedIn',
			title: 'Easter Egg',
			email: req.session.user,
		})
	} else if (req.session.acct == "business") {
		res.render("conation/easteregg", {
			layout: 'layoutBusinessOwner',
			title: 'Easter Egg',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.render('conation/easteregg', { layout: 'layoutLoggedOut', title: 'Easter Egg' });
	}
});

app.get('/logout', function (req, res) {
	// Log User Out
	req.session.destroy();
	res.redirect('/login');
});

app.get('/registration', (req, res) => {
	if (req.session.email) {
		// Log User Out
		req.session.destroy();
	}
	res.render('conation/registration', { layout: 'layoutLoggedOut', title: 'Registration' });
});

app.get('/customer_registration', (req, res) => {
	if (req.session.email) {
		// Log User Out
		req.session.destroy();
	}
	res.render('conation/customer_registration', { layout: 'layoutLoggedOut', title: 'Customer Registration' });
});

app.get('/business_registration', (req, res) => {
	if (req.session.email) {
		// Log User Out
		req.session.destroy();
	}
	res.render('conation/business_registration', { layout: 'layoutLoggedOut', title: 'Business Registration' });
});

app.get('/license', (req, res) => {
	if (req.session.user && req.session.acct === "customer") {
		res.render("conation/license", {
			layout: 'layoutLoggedIn',
			title: 'Licensing',
			email: req.session.user,
		})
	}

	else if (req.session.user && req.session.acct === "business") {
		res.render("conation/license", {
			layout: 'layoutBusinessOwner',
			title: 'Licensing',
			email: req.session.user,
			id: req.session.businessId
		})
	}

	else {
		res.render('conation/license', {layout: 'layoutLoggedOut', title: 'Licensing'});
	}
});

app.get('/about', (req, res) => {
	if (req.session.acct == "customer") {
		res.render("conation/about", {
			layout: 'layoutLoggedIn',
			title: 'About Us',
			email: req.session.user,
		})
	} else if (req.session.acct == "business") {
		res.render("conation/about", {
			layout: 'layoutBusinessOwner',
			title: 'About Us',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.render('conation/about', { layout: 'layoutLoggedOut', title: 'About Us' });
	}

});

app.get('/map', (req, res) => {
	if (req.session.acct == "customer") {
		res.render("conation/map", {
			layout: 'layoutLoggedIn',
			title: 'Conation',
			email: req.session.user,
		})
	} else if (req.session.acct == "business") {
		res.render("conation/map", {
			layout: 'layoutBusinessOwner',
			title: 'Conation',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.redirect('/login');
	}
});

app.get('/update_info', (req, res) => {
	if (req.session.user) {
		if (req.session.acct == "business") {
			pool.query(`SELECT * FROM business_owners WHERE business_id = "${req.session.businessId}"`, function (err, result) {
				let firstName = result[0].first_name;
				let lastName = result[0].last_name;
				let phone = result[0].phone;
				pool.query(`SELECT * FROM businesses WHERE id = "${req.session.businessId}"`, function (err, result) {
					console.log("The result is: " + result[0].description)
					res.render('conation/update_business_info', {
						layout: 'layoutBusinessOwner',
						title: 'Update Profile',
						email: req.session.email,
						id: req.session.businessId,
						address: result[0].address,
						address_2: result[0].address_2,
						city: result[0].city,
						postal_code: result[0].postal_code,
						description: result[0].description,
						lat: result[0].lat,
						lng: result[0].lng,
						firstName: firstName,
						lastName: lastName,
						phone: phone			
					});
				})
			})

		} else {
			pool.query(`SELECT * FROM customers WHERE id = "${req.session.customerId}"`, function (err, result) {
				res.render('conation/update_customer_info', {
					layout: 'layoutLoggedIn',
					title: 'Update Profile',
					email: req.session.email,
					firstName: result[0].first_name,
					lastName: result[0].last_name,
					phone: result[0].phone
				});
			})
		}

	} else {
		res.redirect('/login');
	}
});

app.get('/add_product', (req, res) => {
	if (req.session.acct == "business") {
		res.render("conation/add_product", {
			layout: 'layoutBusinessOwner',
			title: 'Add Product',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.redirect('/main')
	}
});

app.get("/news_form", (req, res) => {
	if (req.session.acct == "business") {
		res.render("conation/news_form", {
			layout: 'layoutBusinessOwner',
			title: 'Add News Update',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.redirect('/main')
	}
})


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
	pool.query('SELECT * FROM business_hours JOIN businesses ON businesses.id = business_hours.business_id;', function (err, result) {
		console.log("Getting data");
		res.json(result);
	});
});



// ------------------------- //
// COMPLEX DATABASE QUERIES  //
// ------------------------- //

// ========================= //

// LOGIN //

app.post("/login", (req, res) => {
	// SQL code goes here
	let input = req.body;
	let input_email = input.email;
	let input_password = input.password;

	// Check if user exists
	pool.query(`SELECT email FROM customers WHERE email ='${input_email}' UNION SELECT email FROM business_owners WHERE email ='${input_email}'`, function (err, result) {
		if (err) {
			console.log(err);

			res.redirect('/login');
		} else {
			if (!result[0]) {
				console.log("That email does not exist");
				res.redirect('/login');
			} else {
				if (result[0].email.length > 0) {
					pool.query(`SELECT password FROM customers WHERE email ='${input_email}' UNION SELECT password FROM business_owners WHERE email ='${input_email}'`, function (err, result) {
						if (err) {
							console.log(err);
							res.redirect('/login');

						} else {
							console.log(result);
							bcrypt.compare(input_password, result[0].password, function (err, result) {
								if (result) {
									pool.query(`SELECT first_name, last_name, email FROM customers WHERE email ='${input_email}'`, function (err, result) {
										if (err) {
											console.log(err);
											res.redirect('/login');

										} else {
											pool.query(`SELECT email FROM customers WHERE email ='${input_email}'`, function (err, result) {
												console.log(result);
												if (result != "") {

													let query = `SELECT id FROM customers WHERE email = "${input_email}"`;
													pool.query(query, (err, result) => {
														if (err) {
															console.log(err);
														}
														console.log("customer")
														let id = result[0].id;
														req.session.email = input_email;
														req.session.user = input_email;
														req.session.acct = "customer";
														req.session.customerId = id;
														req.session.cookie.maxAge = 600000;
														res.redirect("/main");
													})

												} else {
													let query = `SELECT business_id FROM business_owners WHERE email = "${input_email}"`;
													pool.query(query, (err, result) => {
														if (err) {
															console.log(err);
														}
														let id = result[0].business_id;
														console.log("business");
														req.session.email = input_email;
														req.session.user = input_email;
														req.session.businessId = id;
														req.session.acct = "business";
														req.session.cookie.maxAge = 600000;
														res.redirect("/main");
													})
											
												}
											})
											// // SET UP COOKIE ONLY WHEN LOGGED IN
											// req.session.email = input_email
											// req.session.user = input_email
											// req.session.cookie.maxAge = 100000000
											// res.redirect("/main")
										}
									})
								} else {
									console.log("Passwords do not match");
									res.redirect("/login");
								}
							});
						}
					});
				}
			}
		}
	});
});

// ========================= //

// CUSTOMER REGISTRATION //

app.post('/customer_registration', (req, res) => {
	let input = req.body;
	let password1 = input.password;
	let password2 = input.password2;
	let email = input.email;
	let phone = input.phone;
	let firstName = input.firstName;
	let lastName = input.lastName;

	pool.query(`SELECT email FROM customers WHERE email ='${email}' UNION SELECT email FROM business_owners WHERE email ='${email}'`, function (err, result) {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		} else {
			if (result[0]) {
				console.log(result);
				console.log("That email already exists");
				res.redirect('/customer_registration');
			} else {
				// Hash Password
				let hashedPassword = bcrypt.hashSync(password1, 10);

				// SQL code goes here, using name values from the form
				let query = `INSERT INTO customers (password, first_name, last_name, email, phone) VALUES ("${hashedPassword}", "${firstName}", "${lastName}", "${email}", "${phone}");`;
				pool.query(query, (err, result) => {
					if (err) {
						console.log(err);
						return res.status(500).send(err);
					}
					// Redirect URL on success
					console.log(result);
					res.render("conation/login",
						{
							layout: "layoutLoggedOut",
							title: "Conation",
						})
				});
				res.redirect('/login');

			}
		}
	})
})

// ========================= //

// BUSINESS REGISTRATION //

app.post('/business_registration', upload.single("image"), (req, res) => {
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
			console.log(err);
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
						let newBusinessIDQuery = `SELECT business_id FROM business_owners WHERE email = "${email}"`;
						pool.query(newBusinessIDQuery, (err, idResult) => {
							if (req.file) {
								// Image upload start
								// This image upload code was adapted from: https://stackoverflow.com/a/15773267/13577042
								const tempPath = req.file.path;
								const targetPath = path.join(__dirname, "public/src/images/businesses/" + idResult[0].business_id + ".png");
								fs.rename(tempPath, targetPath, err => {
									if (err) {
										console.log(err);
									};
								});
							}
								// Image upload end
								// Source: https://stackoverflow.com/a/15773267/13577042
							res.render("conation/login", { layout: "layoutLoggedOut", title: "Conation" });
						});
					}
				});
			}
		}
	});
});

// ========================= //
//    MAIN BUSINESS PAGES    //

app.get('/main', (req, res) => {
	// console.log(req.session.cookie.maxAge);
	// console.log(req.session)
	// console.log(req.session.email);
	// console.log("on main");
	if (req.session.user) {
		let query = "SELECT businesses.id AS id, businesses.name AS name, businesses.description AS description, businesses.category AS category, COUNT(products.id) AS product_count FROM businesses LEFT JOIN products ON products.business_id = businesses.id GROUP BY businesses.id";
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err);
			}
			else if (req.session.acct == "customer") {
				res.render("conation/main", {
					layout: 'layoutLoggedIn',
					title: 'Conation',
					email: req.session.user,
					businesses: result
				})
			} else {
				let businesses = result;
				let query = `SELECT business_id FROM business_owners WHERE email = "${req.session.email}"`;
				pool.query(query, (err, result) => {
					if (err) {
						console.log(err);
					} else {
						console.log(result)
						res.render("conation/main", {
							layout: 'layoutBusinessOwner',
							title: 'Conation',
							email: req.session.user,
							id: req.session.businessId,
							businesses: businesses
						});
					}
				});

				
			}
		});

	} else {
		res.redirect('/login');
	}
});


app.post('/businessSearch', (req, res) => {
	if (req.session.user) {
		let query = `SELECT * FROM businesses WHERE name LIKE '%${req.body.search}%';`;
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err);
			}
			else if (req.session.acct == "customer") {
				res.render("conation/main", {
					layout: 'layoutLoggedIn',
					title: 'Conation',
					email: req.session.email,
					businesses: result
				})
			}
			else {
				res.render("conation/main", {
					layout: 'layoutBusinessOwner',
					title: 'Conation',
					email: req.session.email,
					businesses: result,
					id: req.session.businessId
				});
			}
		});
	} else {
		res.redirect('/login');
	}
});

app.post('/businessType', (req, res) => {
	if (req.session.user) {
		let query = `SELECT * FROM businesses ORDER BY category ASC, name ASC;`;
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err);
			}
			else if (req.session.acct == "customer") {
				res.render("conation/main", {
					layout: 'layoutLoggedIn',
					title: 'Conation',
					email: req.session.email,
					businesses: result
				});

			}
			else {
				res.render("conation/main", {
					layout: 'layoutBusinessOwner',
					title: 'Conation',
					email: req.session.email,
					businesses: result,
					id: req.session.businessId
				});
			}
		});
	} else {
		res.redirect('/login');
	}
});


// ========================= //
// INDIVIDUAL BUSINESS PAGE  //

app.get('/business/:id', (req, res) => {
	if (req.session.user) {
		let id = req.params.id;
		console.log(id)
		let businessQuery = `SELECT * FROM businesses WHERE id = ${id};`;
		pool.query(businessQuery, (err, businessResult) => {
			if (err) {
				console.log(err);
			}
			let hoursQuery = `SELECT * FROM business_hours WHERE business_id = ${id}`;
			pool.query(hoursQuery, (err, hoursResult) => {
				if (err) {
					console.log(err);
				}
				let newsQuery = `SELECT title, DATE_FORMAT(date, "%y-%m-%d") AS date, content FROM news WHERE business_id = ${id} ORDER BY date DESC;`;
				pool.query(newsQuery, (err, newsResult) => {
					if (err) {
						console.log(err);
					}
					let productQuery = `SELECT * FROM products WHERE business_id = ${id} ORDER BY cost ASC;`;
					pool.query(productQuery, (err, productResult) => {
						if (err) {
							console.log(err);

						} else if (req.session.acct == "customer") {
							res.render("conation/business", {
								layout: 'layoutLoggedIn',
								title: businessResult[0].name,
								email: req.session.email,
								business: businessResult[0],
								hours: hoursResult[0],
								news: newsResult,
								products: productResult
							});

						} else {
							res.render("conation/business_purchase_disabled", {
								layout: 'layoutBusinessOwner',
								title: businessResult[0].name,
								email: req.session.email,
								business: businessResult[0],
								hours: hoursResult[0],
								news: newsResult,
								products: productResult,
								id: req.session.businessId
							});
						}
					});
				});
			});
		});
	} else {
		res.redirect('/login');
	}
});

// ========================= //
//        DONATIONS          //

app.get('/donate/:productID', (req, res) => {
	if (req.session.user && req.session.acct === "customer") {
		pool.query(`SELECT * FROM products WHERE id = ${req.params.productID};`, (err, result) => {
			if (err) {
				console.log(err);

			}
			res.render("conation/donate", {
				layout: 'layoutLoggedIn',
				title: result[0].name,
				product: result[0],
				email: req.session.user
				});

		});
	}

	else if (req.session.user && req.session.acct === "business") {
		res.redirect('/error');
	}

	else {
		res.redirect('/login');
	}
});

app.post('/addDonation', (req, res) => {
	console.log(req.body);

	let query = `INSERT INTO donations (customer_id, product_id, amount) VALUES ('${req.session.customerId}', '${req.body.product_id}', '${req.body.amount}');`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
		}
		console.log(result);
		res.redirect('/donate/' + req.body.product_id);
	});
});

app.get('/my_donations', (req, res) => {
	//Need to add something to get total sum of all donations by user
	if (req.session.user && req.session.acct == "customer") {
		// `SELECT * FROM donations JOIN products ON products.id = donations.product_id JOIN businesses ON businesses.id = products.business_id WHERE customer_id = 1;`
		let donationProductsQuery = `SELECT DATE_FORMAT(donations.date, "%y-%m-%d") AS date, donations.amount AS amount, products.description AS prodDesc, products.name AS prodName, products.id AS id, businesses.name AS busName, businesses.description as busDesc, businesses.address, businesses.address_2, businesses.city, businesses.province, businesses.postal_code FROM donations JOIN products ON products.id = donations.product_id JOIN businesses ON businesses.id = products.business_id WHERE customer_id "${req.session.customerId}";`;
		pool.query(donationProductsQuery, (err, result) => { // Need customer id to be based on session
			if (err) {
				console.log(err);
			}
			let sumQuery = `SELECT SUM(amount) AS sum FROM donations WHERE customer_id = "${req.session.customerId}";`;
			pool.query(sumQuery, (error, sum) => {
				if (error) {
					console.log(error);
				}
				res.render("conation/my_donations", {
					layout: 'layoutLoggedIn',
					title: 'My Donations',
					email: req.session.email,
					donations: result,
					total: sum[0]
				});
			});
		});
	}

	else if (req.session.user && req.session.acct == "business") {
		res.redirect('/track_donations');
	}

	else {
		res.redirect('/login')
	}
});

app.get('/track_donations', (req, res) => {
	if (req.session.user && req.session.acct == "business") {
		let businessDonationsQuery = `SELECT *, products.id AS productID, SUM(amount) AS productSum, COUNT(amount) AS numSold FROM products LEFT JOIN donations ON products.id = donations.product_id WHERE business_id = "${req.session.businessId}" GROUP BY productID;`;
		pool.query(businessDonationsQuery, (err, result) => {
			if (err) {
				console.log(err);
			}

			let totalDonationsQuery = `SELECT SUM(amount) AS sum FROM donations JOIN products ON products.id = donations.product_id WHERE products.business_id = "${req.session.businessId}";`;
			pool.query(totalDonationsQuery, (error, totalDonations) => {
				if (error) {
					console.log(error)
				}
				console.log(result);
				res.render("conation/track_donations", {
					layout: 'layoutBusinessOwner',
					title: 'Track Donations',
					email: req.session.email,
					id: req.session.businessId,
					products: result,
					total: totalDonations[0]
				});
			});
		});
	}

	else if (req.session.user && req.session.acct == "customer") {
		res.redirect('/my_donations');
	}

	else {
		res.redirect('/login');
	}
});

// ========================= //
//      LISTING PRODUCTS     //

app.post('/addProduct', upload.single("productIMG"), (req, res) => {
	let id = req.session.businessId;
	let query = `INSERT INTO products (name, description, cost, business_id) VALUES ("${req.body.productName}", "${req.body.productDesc}", "${req.body.productCost}", "${id}");`;
	pool.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.redirect('/add_product?success=false');
		}
		if (req.file) {
			// Image upload start
			// This image upload code was adapted from: https://stackoverflow.com/a/15773267/13577042
			const tempPath = req.file.path;
			const targetPath = path.join(__dirname, "public/src/images/products/" + result.insertId + ".png");
			fs.rename(tempPath, targetPath, err => {
				if (err) {
					console.log(err);
				};
			});
		}
			// Image upload end
			// Source: https://stackoverflow.com/a/15773267/13577042
		res.redirect('/add_product?success=true');
	});
});

// ========================= //
//    UPDATE PROFILE INFO    //

app.post('/updateProfile', (req, res) => {

	if (req.session.user) {
		console.log(req.body);
		if (req.session.acct == "business") {
			let query = `UPDATE business_owners SET first_name = "${req.body.firstName}", last_name = "${req.body.lastName}", phone = "${req.body.phone}" WHERE email = "${req.session.email}"`;
			pool.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.redirect("/update_info?success=false");
				}
				res.redirect("/update_info?success=true");
			});

		} else {
			let query = `UPDATE customers SET first_name = "${req.body.firstName}", last_name = "${req.body.lastName}", phone = "${req.body.phone}" WHERE email = "${req.session.email}"`;
			pool.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.redirect("/update_info?success=false");

				}
				res.redirect("/update_info?success=true");
			});

		}

	} else {
		res.redirect('/login');
	}
});

app.post('/updatePassword', (req, res) => {
	if (req.session.user) {
		let hashedPassword = bcrypt.hashSync(req.body.password, 10);

		if (req.session.acct == "business") {
			let query = `UPDATE business_owners SET password = "${hashedPassword}" WHERE email = "${req.session.email}"`;
			pool.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.redirect("/update_info?success=false");

				}
				res.redirect("/update_info?success=true");
			});

		} else {
			let query = `UPDATE customers SET password = "${hashedPassword}" WHERE email = "${req.session.email}"`;
			pool.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.redirect("/update_info?success=false");
				} else {
					res.redirect("/update_info?success=true");
				}
			});
		}

	} else {
		res.redirect('/login');
	}
});

app.post('/updateBusinessInfo', (req, res) => {
	if (req.session.user) {
		console.log("ok");
		let query = `SELECT business_id FROM business_owners WHERE email = "${req.session.email}"`;
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err);
			}
			let id = result[0].business_id;
			let query = `UPDATE businesses SET address = "${req.body.address}", address_2 = "${req.body.address2}", city = "${req.body.city}", province = "${req.body.province}", postal_code = "${req.body.postal}", category = "${req.body.category}", description = "${req.body.description}", lat = "${req.body.lat}", lng = "${req.body.long}"  WHERE id = "${id}"`;
			pool.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.redirect("/update_info?success=false");
				} else {
					res.redirect("/update_info?success=true");
				}
			})
		})
	} else {
		res.redirect('/login');
	}
});

app.post("/updateBusinessHours", (req, res) => {
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

	if (req.session.user) {
		console.log("ok")
		let query = `SELECT business_id FROM business_owners WHERE email = "${req.session.email}"`;
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err)
			}
			let id = result[0].business_id
			let query = `UPDATE business_hours SET mon = "${mon}", tue = "${tue}", wed = "${wed}", thu = "${thu}", fri = "${fri}", sat = "${sat}", sun = "${sun}" WHERE business_id = "${id}";`;
			pool.query(query, (err, result) => {
				if (err) {
					console.log(err);
					res.redirect("/update_info?success=false");
				} else {
					res.redirect("/update_info?success=true");
				}
			});
		})
	} else {
		res.redirect('/login');
	}
});

app.post('/updateBusinessImage', upload.single("image"), (req, res) => {
	if (req.session.user) {
		let query = `SELECT business_id FROM business_owners WHERE email = "${req.session.email}"`;
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err);
			}
			let id = result[0].business_id;
			const tempPath = req.file.path;
			const targetPath = path.join(__dirname, "public/src/images/businesses/" + id + ".png");
			fs.rename(tempPath, targetPath, err => {
				if (err) {
					console.log(err);
				};
			});
		res.redirect('/update_info');
		});
	}
});


// ========================= //
//        NEWS POSTS         //

app.post("/addNewsPost", (req, res) => {
	if (req.session.acct == "business"){
		let query = `SELECT business_id FROM business_owners WHERE email = "${req.session.email}"`;
		pool.query(query, (err, result) => {
			if (err) {
				console.log(err)
			}
			let id = result[0].business_id
			let query = `INSERT INTO news (business_id, title, content) VALUES ("${id}", "${req.body.title}", "${req.body.description}")`;
			pool.query(query, (err, result) => {
				if (err) {
					res.redirect("/news_form?success=false");
				} else {
					res.redirect("/news_form?success=true");
				}
			});
		})
	}
	else {
		res.redirect("/main")
	}
});


// 404 ERROR HANDLING //
app.get('*', function(req, res){
	if (req.session.acct == "customer") {
		res.render("conation/error", {
			layout: 'layoutLoggedIn',
			title: 'Conation',
			email: req.session.user,
		})
	} else if (req.session.acct == "business") {
		res.render("conation/error", {
			layout: 'layoutBusinessOwner',
			title: 'Conation',
			email: req.session.user,
			id: req.session.businessId
		})

	} else {
		res.render("conation/error", { layout: 'layoutLoggedOut', title: 'Conation' });
	}  });


var port = process.env.PORT || 8080;

app.listen(port);
console.log("running on port 8080");
