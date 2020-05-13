let lives = 7;
let gameScore = 0;

// Defining the keyboard wrapper
const keyboard = document.getElementById('keyboard');


// List of words and hints --> the hint and word have to be in same index
let wordList = ["conation", "python", "tea", "arjun", "sarah", "nicholas", "hudson", "vaccine", "immunocompromised", "vancouver", "bcit", "cst"];

let hintList = ["strives to help business hit hardest by COVID-19.",
    "A high-level general-purpose programming language; also the name of a snake.",
    "A hot drink made by infusing the dried crushed leaves of the tea plant in boiling water.",
    "Has a BSc in Biology at UVic. Hobbies include baking, Ariana Grande, and petting dogs.",
    "Spent four months volunteering in West Africa.",
    "Has a Background in literature and communication, graduating from SFU with a B.A. in English and a minor in Publishing.",
    "Youngest team member on this project.",
    "A substance used to stimulate the production of antibodies and provide immunity against one or several diseases.",
    "Having an impaired immune system.",
    "A coastal seaport city in western Canada, located in the Lower Mainland region of British Columbia.",
    "BC's largest post-secondary institutions with more than 48,000 students.",
    "A longstanding and well-recognized two-year software development program."]


// Decide which index/word onload  --> we gonna need to make it happen after a game is done too somehow
let wordIndex = Math.floor(Math.random() * wordList.length);
let secretWord = wordList[wordIndex]; // Select a random word from the wordList
let hint = hintList[wordIndex];

let lettersLeft = secretWord.length;
let guessList = [];


// Display _ for each letter of selected word
let blankWord = [];
for (i = 0; i < secretWord.length; i++) {
    blankWord[i] = "_"
}


// Function to start the game  on page load
function startGame(blankWord, secretWord){
    showWord();  // Display the hidden word
    showLives();  // Display 7 lives
    showLettersLeft();  // Display how many letters are left
    createButtons();  // Generate the keyboard
}


document.onload = startGame();  // Prepare the game onload


function lifeReducer() { // deduct lives when user pushed the wrong letter btn
    lives -= 1;
    picChange();
    if (lives == 0) {   // check if user's live is zero
        setTimeout(function(){
            let person = prompt("You Lost! Please enter your name", "Name");
            if (!alert(person + " you lost. Game over, your score is " + gameScore)) { window.location.reload(); }
        }, 300);
       
    }
}


// Change the image according to the user's remianing lives
function picChange() {
    let image = document.getElementById('hangmanImg');
    let imageList = ['src/images/pic0.png', 'src/images/pic1.png', 'src/images/pic2.png', 'src/images/pic3.png', 'src/images/pic4.png', 'src/images/pic5.png', 'src/images/pic6.png', 'src/images/pic7.png'];
    image.src = imageList[7 - lives];
}


// Check if the user won the game
function checkWonGame() {
    lettersLeft -= 1;
    if (lettersLeft == 0) {
        showWord();
        setTimeout(function(){  // this timeout allows the word to appear before the Alert
            let person = prompt("You Won! Please enter your name", "Name");
            if (!alert(person + ', your score is ' + gameScore)) { window.location.reload(); }
        }, 100)
    }
}


// Function that handles the user's letter guess
function guess(btn) {
    element = btn.target;
    letter = element.innerHTML;
    counter = 0  // This is checking to see if there are any matches

    // If the letter being guessed has already been guessed, inform the player
    if (guessList.includes(letter)) {
        alert("Already guessed.");
    
    } else {
        guessList.push(letter); // Add the letter to the list of guessed letters
        showGuesses(); // Show the user the new list of guessed letters

        for (i = 0; i < secretWord.length; i++) {  // Go through the secret word
            if (secretWord[i] == letter) {  // If the letter matches a letter of the word
                blankWord[i] = letter;  // Change the _ of the secret word to the guessed letter
                counter += 1;  // Increcement number of guesses

                gameScore += 1;
                showWord();
                checkWonGame();
            }
        }
        if (counter == 0) {  // If no matches
            gameScore -=1; // reduce game score by 1
            lifeReducer();  // Reduce lives by 1
        }
    }
    showLives();  // Reveal lives left, letters left to guess, and the score
    showLettersLeft(); 
    showScore();
}


// Creating Buttons (Dynamic Keyboard)
function createButtons() {
    // Create QWERTY array
    let qwerty = "qwertyuiopasdfghjklzxcvbnm".split('');

    for (let i = 0; i < qwerty.length; i++) {
        if (i == 10 || i == 19) {
            let linebreak = document.createElement("br");
            keyboard.appendChild(linebreak)
        }
        // Create button
        let btn = document.createElement("button")
        // Assign button's text to it's cooresponding letter
        btn.innerHTML = qwerty[i];
        btn.className = 'btn-lg';
        
        btn.style = 'border-radius: 6px';
        btn.style.padding = '10px 16px';
        // Add on click event to each button
        btn.addEventListener('click', guess);
        btn.addEventListener('click', function (btn) {
            element = btn.target
            element.className = 'btn-lg active'
        })
        // Append it to the keyboard wrapper
        keyboard.appendChild(btn);
    }
}


// SIMPLE FUNCTIONS //

// Reveal the hint for a word
function showHint() {
    document.getElementById('hintText').innerHTML = hint;
}


// Show the secret word (will start at _ _ _, but as letters are guessed, it will change)
function showWord() {
    document.getElementById('wordDisplay').innerHTML = blankWord.join(" ");
}


// Show lives remaining
function showLives() {
    document.getElementById('live').innerHTML = 'Lives Remaining: ' + lives;
}


// Show letter left in the secret word
function showLettersLeft() {
    document.getElementById('letterLeft').innerHTML = 'Letters Remaining: ' + lettersLeft;
}


// Show letters that have been guessed
function showGuesses() {
    guessList.sort()
    document.getElementById('guesses').innerHTML = 'Guessed Letters: ' + guessList.join(" ");
}


// Show the user's score
function showScore() {
    document.getElementById('score').innerHTML = 'Score Letters: ' + gameScore;
}


// End game
let gameOverbtn = document.getElementById('endGame');
gameOverbtn.addEventListener('click', function (e) {
    let person = prompt("Please enter your name", "Ariana Grande");
    alert(person + ', your score is ' + gameScore);
})


// Reset game
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function (e) {
    location.reload();
})