var selectableWords = [
    "BREATHE",
    "RELAX",
    "RAIN",
    "CALM",
    "SUN",
];


// Main variables
const maxTries = 10;
var remainingGuesses = 0;       
var guessedLetters = [];       
var guessingWord = [];         
var currentWordIndex;           
var wins = 0;                  
var gameOver = false;    


// List of text prompts
let breathe = "Don't forget to breathe! programming can be difficult!";
let relax = "Relax, be sure to make time for things you enjoy!";
let rain = "...";
let calm = "Be sure to take breaks!";
let sun = "Don't forget to go outside!";
let winText = "Nice Job! Press any key to try again.";


// Start of the game
function startGame() {
    remainingGuesses = maxTries;
    guessedLetters = [];
    guessingWord = [];
    document.getElementById("imageHolder").src = "";
    
    let currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    
    
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_ ");
    };


// Checks for winning conditions and prints to display
    function checkWin() {
    
        if(guessingWord.indexOf("_ ") === -1) {
            wins++;
            gameOver = true;
            document.getElementById("currentWord").innerHTML = "<h3>Nice Job! Press any key to try again.</h3>";
            
        }  if (currentWordIndex === 0 && guessingWord.indexOf("_ ") === -1){
            document.getElementById("divText").innerText = breathe;
            document.getElementById("imageHolder").src = "./assets/images/breathe.jpg";
            document.getElementById("leftDivHeader").innerHTML = "Breathe!";

        } if (currentWordIndex === 1 && guessingWord.indexOf("_ ") === -1){
            document.getElementById("divText").innerText = relax;
            document.getElementById("imageHolder").src = "./assets/images/relax.jpg";
            document.getElementById("leftDivHeader").innerHTML = "Relax!";

        } if (currentWordIndex === 2 && guessingWord.indexOf("_ ") === -1){
            document.getElementById("divText").innerText = rain;
            document.getElementById("imageHolder").src = "./assets/images/rain.jpg";
            document.getElementById("rain").style.opacity = "1";
            document.getElementById("leftDivHeader").innerHTML = "Rain!";

        } if (currentWordIndex === 3 && guessingWord.indexOf("_ ") === -1){
            document.getElementById("divText").innerText = calm;
            document.getElementById("imageHolder").src = "./assets/images/calm.jpg";
            document.getElementById("leftDivHeader").innerHTML = "Calm";

        } if (currentWordIndex === 4 && guessingWord.indexOf("_ ") === -1){
            document.getElementById("divText").innerText = sun;
            document.getElementById("imageHolder").src ="./assets/images/sun.jpg";
            document.getElementById("rain").style.opacity = "0.0";
            document.getElementById("leftDivHeader").innerHTML = "Sun!";
        }
    };
    
    
// Checks for lossing conditions
    function checkLoss(){
        if(remainingGuesses <= 0) {
            document.getElementById("currentWord").innerHTML = "<h3>Sorry! Try again.</h3>"
            gameOver = true;
            wins = 0;
        }
    };


// listens for user input and resets game if it's over
    document.onkeydown = function(event) {
        if(gameOver) {
            startGame();
            gameOver = false;
            } else {
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                var userGuess = makeGuess(event.key.toUpperCase());
                updateDisplay();
                checkWin();
                checkLoss();
            }
        }
    };


// Updates different sections of the html
    function updateDisplay() {

        var guessingWordText = "";

        for (var i = 0; i < guessingWord.length; i++) {
            guessingWordText += guessingWord[i];
        }
        
        document.getElementById("totalWins").innerText = wins;
        document.getElementById("currentWord").innerText = guessingWordText;
        document.getElementById("remainingGuesses").innerText = remainingGuesses;
        document.getElementById("guessedLetters").innerText = guessedLetters;
    };
    
    
    
// Takes user input and tests it against the guessing word
    function evaluateGuess(letter) {
      
        var positions = [];
    
        for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
            if(selectableWords[currentWordIndex][i] === letter) {
                positions.push(i);
            }
        }


        if (positions.length <= 0) {
            remainingGuesses--;
        } else {
            for(var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
    };
    
    
    
// Makes sure there are no repeat guesses
    function makeGuess(letter) {
        if (remainingGuesses > 0) {
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
        }
    };
    
};

