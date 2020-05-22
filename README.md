# COMP-2800-Projects-2

# Conation

Welcome to Conation, an app designed by BCIT students to help small local businesses survive the COVID-19 global pandemic.

## About the Team

The Conation team is:

Arjun Dhaliwal (A01207854)  
Hudson McManus (A01190462)  
Nicholas Lisicin-Wilson (A01180339)  
Sarah Eslamdoust (A01088358)

# Before You Start

Before following the set-up instructions, review and ensure that you have the following:

## Project Structure

These are the important files and folders of the app and how they are structured.

* **/**
  * app.js: Express code that runs the server for our application, getting and posting requests and querying the database
  * package.json: A list of all dependencies
  * **/public**
    * CSS and JS files used throughout our app for styling and functionality
    * **/src/images**
      * Images used in the app
      * **/businesses**
        * User-uploaded business images
      * **/products**
        * User-uploaded product images
  * **/views**
    * Layout templates that display depending on whether the user is logged in or not, and the type of their account
    * **/conation**
      * EJS files containing the HTML layout for all pages of the website
    * **/partials**
      * EJS files containing the HTML layout for headers, footers, and nav bars
  * **/sample_data**
    * SQL statements to populate the database with sample data

## Languages

Conation was programmed using various languages. Ensure that you are able to program in the following languages prior to working with Conation:

- HTML
- CSS
- JavaScript
- EJS
- SQL

## IDE

To work with the Conation application, you will require an IDE. We recommend installing and using one of two IDEs that were used during the development of Conation. The IDEs are as follows:

| IDE | Download Link|
| --- | --- |
| Visual Studio Code | https://code.visualstudio.com/ |
| WebStorm | https://www.jetbrains.com/webstorm/ |

Please note: Only one IDE is required for Conation, so review the two options and pick the one that is the most appealing to you.


## API

Conation uses APIs to effectively run the application. The APIs used, as well as their documentation and the files where their keys are required, are listed in the following table:

| API | Documentation| Key Location |
| --- | --- | --- |
| Google Maps Javascript API | https://developers.google.com/maps/documentation/javascript/tutorial | map.ejs |
| Google Maps Geocoding API | https://developers.google.com/maps/documentation/geocoding/start | business_registration.ejs, update_business_info.ejs|
| PayPal API | https://developer.paypal.com/docs/api/overview/ | donate.ejs |

## External Libraries Used

The following external libraries are used at various points in our application, listed here with links to their documentation.

| Library | Documentation |
| --- | --- |
| Ajax | https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX |
| Animate.css | https://animate.style/#documentation |
| Bootstrap | https://getbootstrap.com/docs/4.5/getting-started/introduction/ |
| Express | https://expressjs.com/en/4x/api.html |
| JQuery | https://api.jquery.com/ |
| Node.js | https://nodejs.org/en/docs/ |

## npm Package Dependencies

The following is a list of all essential npm packages required for this application to run. These can all be installed together by typing "npm install" in the command line while positioned in the folder where you've downloaded Conation, or they can be installed individually by typing "npm ____" where the blank space is the name of the package. Please refer to the package.json for the full list of dependencies.

| Package | Version |
| --- | --- |
| bcrypt | 4.0.1 |
| bcryptjs | 2.4.3 |
| ejs | 3.1.2 |
| express | 4.17.1 |
| express-ejs-layouts | 2.5.0 |
| express-sessions | 1.17.1 |
| multer | 1.4.2 |
| mysql | 2.18.1 |
| mysql2 | 2.1.0 |
| paypal-checkout | 4.0.314 |
| serve-favicon | 2.5.0 |

## Database

The external storage for Conation is a MySQL database hosted on AWS. We use an application called MySQLWorkbench to work with the data and maintain the database itself. The following table can be used to initialize a connection to the database.

| Variable | Value|
| --- | --- |
| Host | conation.cxw3qdgdl2eg.us-west-2.rds.amazonaws.com |
| User | conationadmin |
| Database | conation |
| Password | secret1234 |

Sample data was generated using https://mockaroo.com/.  
Sample photos were sourced from https://unsplash.com/.

## Testing

To test the application, we have created a comprehensive test plan at the following link:
https://docs.google.com/spreadsheets/d/1_-jIOHi42n0BxSDEPdQIkjsozleX9lD6Rdxo2vnHrqI/edit?usp=sharing

Please feel free to make a copy and test the application at your convenience.

## Conation Colour Palette

These are the most common and important colours used in our app. All of these can be accessed and changed through the main.css and login.css files.

| Colour | Code |
| --- | --- |
| Body | #E8E7E3 |
| Logo & Log In | #3D3D33 |
| Primary Buttons | Bootstrap Dark |
| Secondary Buttons | #354F52 |
| Header | #52796F |

## Helpful Links

These are some resources that will be useful while you are using Conation.

| Description | Link |
| --- | --- |
| Repository | https://github.com/arjundha/COMP-2800-Team-DTC-08-Conation |
| Test Plan | https://docs.google.com/spreadsheets/d/1_-jIOHi42n0BxSDEPdQIkjsozleX9lD6Rdxo2vnHrqI/edit?usp=sharing |

# Code Attributions

| Author | References | Code Location |
| --- | --- | --- |
| fardjad | https://stackoverflow.com/a/15773267/13577042 | app.js 569-580, 891-902 |
| Media Share Button | https://codepen.io/ayoisaiah/pen/YbNaz | index.ejs |
| Traversy Media | https://www.youtube.com/watch?v=Zxf1mnP5zcw | map.js 89-113 |

# Set-Up

1. Read all the information in the README.md, and ensure that you are prepared to set up Conation on your computer.
2. Download the contents of this repository to your computer.
   - This can be done via Terminal / Command Line, or by downloading the ZIP directly from GitHub.
3. Open the downloaded repository in the IDE of your choice (if the repository is zipped, unzip it first and then open).
4. Navigate to the downloaded repository in your Terminal / Command Line.
   - In VS Code, this can be done by using the shortcut CTRL + ~
5. Run "npm install" to download all the dependencies.
6. After the installation is complete, run "node app.js" to begin running the application.
   - Alternatively, you can run "npm run dev" to execute Nodemon, which will automatically restart the server whenever you save a change.
7. Visit localhost:8080 in your browser to use the application.
8. Have fun!
