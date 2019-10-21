var Word = require('./word.js');
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
];

//Pick random from mlbteams

var randomIndex = Math.floor(Math.random() * mlbTeams.length);
var randomWord = mlbTeams[randomIndex];

//Pass randomWord through Word constructor

var comWord = new Word(randomWord)

var requireNewWord = false;


//Array for letters guessed
var incorrectLetters = [];
var correctLetters = [];

// Set number for number of guess left

var guessesLeft = 8;

function wordGenerator (){

    if(requireNewWord){
        var randomIndex = Math.floor(Math.random() * mlbTeams.length);
        var randomWord = mlbTeams[randomIndex];

        comWord = new Word(randomWord)

        requireNewWord = false;
    }

        var wordComplete = [];
        comWord.objArray.forEach(completeCheck);
        if(wordComplete.includes(false)){
            inquirer.prompt([
                    {
                        type: "input",
                        message: "Guess a letter between A-Z that you think is in the word. To figure out what MLB team it is.",
                        name: "userGuess"
                    }
                ]).then(function(input){
                    if(!letterArray.includes(input.userGuess) || input.userGuess.length > 1){
                        console.log('\nPlease Try again!!!\n')
                        wordGenerator()
                    }else{
                        if(incorrectLetters.includes(input.userGuess) || correctLetters.includes(input.userGuess) || input.userGuess === ""){
                            console.log('\nLetter already Guessed or no letter put in\n');
                            wordGenerator();
                        }else{
                            var wordCheckArray = [];
                            comWord.userGuess(input.userGuess);
                            comWord.objArray.forEach(wordCheck);
                            if(wordCheckArray.join("") === wordComplete.join("")){
                                console.log("\nIncorrect\n");
                                incorrectLetters.push(input.userGuess);
                                guessesLeft --;
                            }else{
                                console.log("\nCorrect\n");
                                correctLetters.push(input.userGuess);
                            }
                            comWord.log();
                            console.log(`\nGuesses left ${guessesLeft}\n`)
                            console.log(`\nLetters guessed ${incorrectLetters.join(" ")}\n`);
                            if(guessesLeft > 0){
                                wordGenerator();                           
                            }else{
                                console.log("Sorry you lost");
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
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to play again?',
            choices: ['Play Again', 'Exit'],
            name: 'restart'
        }
    ]).then(function(input){
        if(input.restart === 'Play Again'){
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 8;
            wordGenerator();
        }else{
            return;
        }
    });
}

wordGenerator()