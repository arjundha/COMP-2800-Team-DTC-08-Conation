# COMP-2800-Projects-2

# Conation
Welcome to Conation, an app designed by BCIT students to help small local businesses survive the COVID-19 global pandemic.
<br><br>
For set-up and documentation information, please review the following:

# Before You Start:
Before following the Set-Up instruction, review and ensure that you have the following:

## Languages:
Conation was programmed using various languages. Ensure that you are able to program in the following languages prior to working with Conation:

- HTML
- CSS
- JavaScript
- EJS
- SQL

## IDE:
To work with the Conation application, you will require an IDE. We recommend installing and using one of two IDEs that were used during the development of Conation. The IDEs are as follows:

| IDE | Download Link|
| --- | --- |
| Visual Studio Code | https://code.visualstudio.com/ |
| WebStorm | https://www.jetbrains.com/webstorm/ |

Please note: Only one IDE is required for Conation, so review the two options and pick the one that is the most appealing to you


## API:
Conation utilizes APIs to effectively run the application. The APIs used, along with their documentation and files where their keys are required are listed in the following table:

| API | Documentation| Key Location |
| --- | --- | --- |
| Google Maps Javascript API | https://developers.google.com/maps/documentation/javascript/tutorial | map.ejs |
| Google Maps Geocoding API | https://developers.google.com/maps/documentation/geocoding/start | business_registration.ejs, update_business_info.ejs|
| PayPal API | https://developer.paypal.com/docs/api/overview/ | donate.ejs |


## Database:
The external storage for the Conation application uses a MySQL Database. We use an application called MySQLWorkbench to work with the data and maintain the database itself. The following table can be used to initialize your database connection to MySQLWorkbench.

| Varaiable | Value|
| --- | --- |
| Host | conation.cxw3qdgdl2eg.us-west-2.rds.amazonaws.com |
| User | conationadmin |
| Database | conation |
| Password | secret1234 |

## Testing:
To test the application, we have created a well-formed test plan at the following link:
https://docs.google.com/spreadsheets/d/1_-jIOHi42n0BxSDEPdQIkjsozleX9lD6Rdxo2vnHrqI/edit?usp=sharing

Please feel free to make a copy and test the application at your convenience.


# Set-Up:
1. Read all the information in the README.md, and ensure that you are prepared to set up Conation on your computer.
2. Download the contents of this repository to your computer.
   - This can be done via Terminal / Command Line, or by downloading the ZIP directly from GitHub.
3. Open the downloaded repository in the IDE of your choice (If the repository is zipped, unzip it first and then open)
4. Navigate to the downloaded repository in your console / command line.
   - In VS Code, this can be done by using the shortcut CTRL + ~
5. Run "npm install" to download all the dependencies.
6. After the installation is complete, run "node app.js" to begin running the application
   - Alternatively, you can run "npm run dev" to execute nodemon, which will restart the server for you whenever you make a change.
7. Visit localhost:8080 in your browser to use the application.
8. Have fun!


# npm Package Dependencies

The following is a list of all essential npm packages required for this application to run. These can all be installed together byv typing "npm install" in the command line while positioned in the folder where you've downloaded Conation, or can be installed individually by typing "npm ____" where the blank space is the name of the package. Please refer to the package.json for the full list of dependencies.

- bcrypt
- bcryptjs
- ejs
- express
- express-ejs-layouts
- express-sessions
- mysql
- mysql2
- paypal-checkout
- serve-favicon


# Conation Colour Pallette

| Colour | Code |
| --- | --- |
| ? | #FFF |
| ? | #FFF |

# Helful Links:
These are some resources that will be useful while you are using Conation.

| Description | Link |
| --- | --- |
| Repository | https://github.com/arjundha/COMP-2800-Team-DTC-08-Conation |
| Test Plan | https://docs.google.com/spreadsheets/d/1_-jIOHi42n0BxSDEPdQIkjsozleX9lD6Rdxo2vnHrqI/edit?usp=sharing |