function Letter(value){
    this.letter = value;
    this.guessed = false;

    this.toString = function(){
        if(this.letter === " "){
            this.letter =true;
            return " ";
        }else{
            if(this.guessed === false){
                return "_";
            }else{
                return this.letter;
            }
        }
    };
    this.playerGuess = function(guess){
        if(guess === this.letter){
            this.guess = true;
        }
    }
}

module.exports = Letter