/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber(){
    return Math.ceil(Math.random() * 100);
}

function shuffle(arr){
    var m = arr.length;
    var i;
    var t;
    while (m){
        i = Math.floor(Math.random()* m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

class Game{
    constructor(){
        this.max_guesses = 5;
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    } 
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower(){
        if (this.playersGuess >= this.winningNumber){
            return false;
        }
        return true;
    }
    playersGuessSubmission(num){
        if (num < 1 || num > 100 || typeof num !== 'number'){
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess();
    }
    checkGuess(){
        if (this.playersGuess === this.winningNumber){
            return 'You Win!'
        }
        if (this.pastGuesses.indexOf(this.playersGuess) !== -1){
            return 'You have already guessed that number.';
        }
        if (this.playersGuess !== this.winningNumber){
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length >= this.max_guesses){
                return 'You Lose.'
            }
        }
        if (this.playersGuess - this.winningNumber < 10){
            return "You're burning up!";
        }
        if (this.playersGuess - this.winningNumber < 25){
            return "You're lukewarm."
        }
        if (this.playersGuess - this.winningNumber < 50){
            return "You're a bit chilly.";
        }
        if (this.playersGuess - this.winningNumber < 100){
            return "You're ice cold!";
        }
    }
    provideHint(){
        var array = [];
        array.push(this.winningNumber);
        array.push(generateWinningNumber());
        array.push(generateWinningNumber());
        array = shuffle(array);
        return array;
    }
    remainingGuesses(){
        return this.max_guesses - this.pastGuesses.length;
    }
}

function newGame(){
    return new Game();
}

function clickOnPlayHandler(e){
    //Au click sur le bouton play, on veut :
    // - récupérer la valeur saisie dans l'élément html ayant pour id "guess", attention la valeur récupérée via la propriété value est toujours un string
    var element = document.getElementById("guess");
    var value = Number(element.value);
    // - prendre en compte si la valeur saisie est vide ou si ce n'est pas un nombre ! 
    if (element.value === "" || isNaN(value)){
        document.getElementById("message").innerHTML += "Warning, the input value is incorrect";
        return;
    }
    // - soumettre la valeur à l'instance en cours du jeu (méthode playersGuessSubmission), attention au type de paramètre attendu
    var result = game_instance.playersGuessSubmission(value)
    document.getElementById("message").innerHTML = result;
    document.getElementById("guesses_list").innerHTML = "";
    for (var i = 0; i < game_instance.pastGuesses.length; i++){
        let currentElement = game_instance.pastGuesses[i];
        document.getElementById("guesses_list").innerHTML = '<span class="guess">' + currentElement + '</span>'; 
    }
    element.value = "";
    document.getElementById("remaining_guesses").innerHTML = game_instance.remainingGuesses() + " more";
    // - en fonction du retour de la soumission : 

    //   * si l'utilisateur a gagné : on lui indique 
    //   * si l'utilisateur a déjà testé ce chiffre : on lui indique
    //   * si l'utilisateur a perdu : on lui indique
    //   * pour les autres cas, on indique le message & on ajoute le dernier chiffre deviné à la liste des éléments présents dans "guesses_list" (concaténation du contenu de innerHTML)



    //Pour indiquer un message à l'utilisateur, dans un premier temps je te propose de regarder la fonction alert() sur mdn 
    //son utilisation est simple et on verra dans un second temps comment afficher un message plus sympa à l'utilisateur !
}

function resetTheGame(e){
    //AU click sur le bouton reset on veut : 
    // - définir la valeur de la variable global contenant l'instance du jeu à une nouvelle instance
    // - vider le contenu html (innerHTML) de l'élément ayant pour id "guesses_list"
    game_instance = new Game();
    document.getElementById("guesses_list").innerHTML = "";
    document.getElementById("remaining_guesses").innerHTML = game_instance.remainingGuesses() + " more";
    document.getElementById("message").innerHTML = "";
    document.getElementById("guess").value = "";
}

function getHint(e){
    //Au click sur le bouton hint on veut : 
    // - Inidiquer à l'utilisateur les 3 valeurs de retour de la méthode "provideHint" sur l'instance en cours du jeu
    document.getElementById("message").innerHTML = "Answers: " + game_instance.provideHint();
}


//pour rappel, le code ci dessous est exécuté une seule fois, au chargement de la page
//Définir les écouteurs sur l'évènement click des différents boutons
document.getElementById("play").addEventListener("click", clickOnPlayHandler);
document.getElementById("reset").addEventListener("click", resetTheGame); 
document.getElementById("hint").addEventListener("click", getHint);

//définir une variable global qui correspondra à l'instance en cours du jeu
var game_instance = new Game();
//Vider le contenu html (innerHTML) de l'élément html ayant pour id "guesses_list"
document.getElementById("guesses_list").innerHTML = "";

/**
 * Helpers : 
 * document.getElementById("id") : permet de récupérer un élément HTML à partir de son attribut "id"
 * element.value : permet de récupérer la valeur d'un input (représenté par la variable element), renvoi toujours le type de l'input
 * element.innerHTML : propriété permettant de manipuler le contenu HTML d'un élément, c'est un String
 * alert("un message cool") : permet d'afficher un message à l'utilisateur
 * var game_inst = new Game(); : définie une nouvelle instance de la classe Game sur la variable game_inst (attention au scope)
 */
