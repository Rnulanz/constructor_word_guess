const Letter = require('./letter');

function Word(answer){
    this.newArr = [];

    for(var i = 0; i < answer.length; i++){
        var letter = new Letter(answer[i]);
            this.newArr.push(letter);
    }

    this.log = function(){
        answerInput = "";
        
        for(var i =0; i < this.newArr.length; i++){
            answerInput += this.newArr[i] + " ";
        }

    console.log(answerInput + "\n======================================\n");
    };
    this.useGuess = function(input){
        for (var i =0; i < this.newArr.length; i++ ){
            this.newArr[i].guess(input);
        }
    
    }
}

module.exports = Word;