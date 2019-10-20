var Word = require('./word');
var inquirer = require('inquirer');


var letterArray = "abcdefghijklmnopqrstuvwxyz";

var mlbTeams = [
    "white sox",
    "red sox",
    "indians",
    "royals",
    "twins",
    "orioles",
    "yankees",
    "rays",
    "blue jays",
    "astros",
    "angels",
    "athletics",
    "mariners",
    "rangers",
    "cubs",
    "reds",
    "brewers",
    "pirates",
    "cardinals",
    "braves",
    "marlins",
    "mets",
    "phillies",
    "nationals",
    "dbacks",
    "rockies",
    "dodgers",
    "padres",
    "giants"
]

//Pick random from mlbteams

var randomIndex = Math.floor(Math.random() * mlbTeams.length);
var randomWord = mlbTeams[randomIndex];

//Pass randomWord through Word constructor

var computerWord = new Word (randomWord)

var newWord = false;


//Array for letters guessed
var incorrectChoice = [];
var correctChoice = [];

// Set number for number of guess left

var guessesLeft = 11;

function wordGenerator (){

    if(newWord){
        var randomIndex = Math.floor(Math.random() * mlbTeams.length);
        var randomWord = mlbTeams[randomIndex];

        var computerWord = new Word (randomWord)

        var newWord = false;
    }

        var wordComplete =[];
        if(wordComplete.includes(false)){
            inquirer
                prompt([
                    {
                        type: "input",
                        message: "Guess a letter between A-z that you think is in the word.",
                        name: "userLetterGuess"
                    }
                ]).then(function(input){
                    if(!letterArray.includes(input.userLetterGuess) || input.userLetterGuess.length > 1){
                        console.log('\n Please Try again!!!\n')
                        wordGenerator()
                    }else{
                        if(incorrectChoice.includes(input.userLetterGuess) || correctChoice.includes(input.userLetterGuess) || input.userLetterGuess === ""){
                            console.log('/nLetter already Guessed or no letter put in\n');
                            wordGenerator();
                        }else{
                            var wordCheckArray = [];
                            computerWord.userGuess(input.userLetterGuess);
                            computerWord.newArr.forEach(wordCheck);
                            if(wordCheckArray.join("") === wordComplete.join("")){
                                console.log("\nIncorrect\n");
                                incorrectChoice.push(input.userLetterGuess);
                                guessesLeft--;
                            }else{
                                console.log("\nCorrect\n");
                                correctChoice.push(input.userLetterGuess);
                            }
                            comWord();
                            console.log(`\nGuesses left ${guessesLeft}\n`)
                            console.log(`\nLetters guessed ${incorrectChoice.join(" ")}\n`);
                            if(guessesLeft > 0){
                                wordGenerator();                           
                            }else{
                                console.log(`Sorry you lose`);
                                restartGame()
                            }
                            function wordCheck(key){
                                wordCheckArray.push(key.guessed);
                            }
                        }
                    }
                });
        }else{
            console.log(`You Win!!!`)
            restartGame()
        }
        function completeCheck(key){
            wordComplete.push(key.guessed);
        }
}

function restartGame(){
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Would you like to play again?',
            choices: ['Play Again', 'Exit'],
            name: 'restart'
        }
    ]).then(function(restart){
        if(restart === 'Play Again'){
            newWord = true;
            incorrectChoice = [];
            correctChoice = [];
            guessesLeft = 11;
            wordGenerator();
        }else{
            return;
        }
    });
}

wordGenerator()