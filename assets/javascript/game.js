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
var hasFinished = false;    


// List of text prompts
let breath = "Don't forget to breathe! programming can be difficult!";
let relax = "Relax, be sure to have fun!";
let rain = "Hopefully I didn't forget to add CSS effects for you...";
let calm = "Be sure to take some breaks and walk away when you need to.";
let sun = "Go outside! There's plenty to explore anywhere you are!"

let winText = "Nice Job! Press any key to try again.";


// Start of the game
function resetGame() {
    remainingGuesses = maxTries;
    
    
    guessedLetters = [];
    guessingWord = [];
    document.getElementById("imageHolder").src = "";
    
    let currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    
    
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    };


    // Checks for winning conditions
    function checkWin() {
    
        if(guessingWord.indexOf("_") === -1) {
            wins++;
            hasFinished = true;
            document.getElementById("currentWord").innerHTML = "<h3>Nice Job! Press any key to try again.</h3>";
            
        }  if (currentWordIndex === 0 && guessingWord.indexOf("_") === -1){
            document.getElementById("divText").innerText = breath;
            document.getElementById("imageHolder").src = "../images/breathe.jpg";
        } if (currentWordIndex === 1 && guessingWord.indexOf("_") === -1){
            document.getElementById("divText").innerText = relax;
            document.getElementById("imageHolder").src = "../../images/relax.jpg";
        } if (currentWordIndex === 2 && guessingWord.indexOf("_") === -1){
            document.getElementById("divText").innerText = rain;
            document.getElementById("imageHolder").src = "../../images/rain.jpg";
        } if (currentWordIndex === 3 && guessingWord.indexOf("_") === -1){
            document.getElementById("divText").innerText = calm;
            document.getElementById("imageHolder").src = "./../images/calm.jpg";
        } if (currentWordIndex === 4 && guessingWord.indexOf("_") === -1){
            document.getElementById("divText").innerText = sun;
            document.getElementById("imageHolder").src ="../images/sun.jpg";
        }
    };
    
    
    // Checks for lossing conditions
    function checkLoss(){
        if(remainingGuesses <= 0) {
            document.getElementById("currentWord").innerHTML = "<h3>Sorry! Try again.</h3>"
            hasFinished = true;
        }
    };


    // listens for key input and resets game if it's over
    document.onkeydown = function(event) {
        if(hasFinished) {
            resetGame();
            hasFinished = false;
    
            // Checks win loss conditions after each key press. Restricts user input to A-Z.
        } else {
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                var userGuess = makeGuess(event.key.toUpperCase());
                updateDisplay();
                checkWin();
                checkLoss();
            }
        }
    };

    function updateDisplay() {

        document.getElementById("totalWins").innerText = wins;
    
        // Display how much of the word we've already guessed on screen.
        // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
        var guessingWordText = "";
        for (var i = 0; i < guessingWord.length; i++) {
            guessingWordText += guessingWord[i];
        }
    
        //
        document.getElementById("currentWord").innerText = guessingWordText;
        document.getElementById("remainingGuesses").innerText = remainingGuesses;
        document.getElementById("guessedLetters").innerText = guessedLetters;
    };
    
    
    
    
    // This function takes a letter and finds all instances of 
    // appearance in the string and replaces them in the guess word.
    function evaluateGuess(letter) {
        // Array to store positions of letters in string
        var positions = [];
    
        // Loop through word finding all instances of guessed letter, store the indicies in an array.
        for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
            if(selectableWords[currentWordIndex][i] === letter) {
                positions.push(i);
            }
        }
    
        if (positions.length <= 0) {
            remainingGuesses--;
        } else {
            // Loop through all the indicies and replace the '_' with a letter.
            for(var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
    };
    
    
    
    
    function makeGuess(letter) {
        if (remainingGuesses > 0) {
            // Make sure we didn't use this letter yet
            if (guessedLetters.indexOf(letter) === -1) {
                guessedLetters.push(letter);
                evaluateGuess(letter);
            }
        }
    };
    
    
    updateDisplay();
    
};



