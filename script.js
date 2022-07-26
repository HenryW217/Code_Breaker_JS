// Create function to handle the input
const userInput = document.getElementById("gameInputForm");
userInput.addEventListener("submit", handleInput);
let userGuess = [];
let answer = [];
let guessCount = 1;
let aCount = 0;
let bCount = 0;
let cCount = 0;
let attemptLeft = 10;

//** Functions could be moved to helpers starts here:
//Generate the answer
function answerGen() {
    const num = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];
    let index = num.length;
    let ranIndex;
    // shuffle num;
    while (index !=0) {
        ranIndex = Math.floor(Math.random() * index);
        index--;
        [num[index], num[ranIndex]] = [
            num[ranIndex], num[index]];
    }
    //  take out four numbers;
    answer = num.slice(6);
    // addding guess result title section #feedback_container
    let resultText = document.createElement("h3");
    resultText.innerHTML = "Guess result: ";
    document.getElementById("feedback_container").appendChild(resultText);
}
//reset input box.
function clearInput() {
    document.getElementById("gameInputForm").reset();
}
//restart the game.
function resetGame() {
    let resultHistory = document.querySelector("#feedback_container");
    child = resultHistory.lastElementChild;
    while (child) {
        resultHistory.removeChild(child);
        child = resultHistory.lastElementChild;
    }
    answerGen();
    clearInput();
    attemptLeft = 10;
    guessCount = 1;
}
//to delete "play again" button
function removePlayAgainBtn() {
    let pABtn = document.querySelector("#game_3");
    child = pABtn.lastElementChild;
    pABtn.removeChild(child);

}
//Function handle play again button clicked
function handlePlayAgain() {
    resetGame();
    //to re-show the input box.
    document.querySelector('#inputGuess').style.display = null;
    document.querySelector('#submitBtn').style.display = null;
    //to delete "play again" button
    removePlayAgainBtn();
}
//Function handle cancel button clicked after a game
function handleCancel() {
    document.querySelector('#inputGuess').style.display = 'none';
    document.querySelector('#submitBtn').style.display = 'none';
    const playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("id", "playAgain");
    playAgainBtn.setAttribute("type", "click");
    playAgainBtn.innerHTML = "Play Again";
    document.getElementById("game_3").appendChild(playAgainBtn);
    playAgainBtn.addEventListener("click", handlePlayAgain)
}
//Functions could be moved to helpers ends here.

//main body
answerGen();
    // start the cycle of input and result.
function handleInput (evt) {
    evt.preventDefault();
    let rawInput = document.getElementById("inputGuess").value;
    let input = Array.from(rawInput, Number);
   //*****need to delete when publish */
    console.log("User enter" +rawInput); // test inputValue
    console.log("Answer" + answer); // test answer
    userGuess = input;
    let aCount = 0;
    let bCount = 0;
// validate input is a four-digit number with no duplicates.
if (userGuess.length != 4 || (isNaN(rawInput)) || (new Set(userGuess).size != 4)) {
        clearInput();
        alert('Please enter a four-digit number\n No duplicates');
// React when user got the number right.
}else if (userGuess.toString() === answer.toString()) {
    const feedback = document.createElement("ul");
        feedback.setAttribute("id", "results");
        feedback.innerHTML = '<h3><i class="bi bi-emoji-sunglasses"></i>  You Win!!! <i class="bi bi-emoji-sunglasses"></i></h3>';
        document.getElementById("feedback_container").appendChild(feedback);

        if (confirm("You Win!!!\nClick 'OK' to play again.\nClick 'Cancel' to check your guesses history") == true) {
            resetGame();
        }else {
            handleCancel();
        }
// Compare the user guess to the answer
} else if (attemptLeft > 1) {
    for (let i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === answer[i]) {
           aCount++;
        }
    }
    bCount = userGuess.filter(e => answer.includes(e)).length - aCount;
    cCount = 4 - aCount - bCount;
    // Provide feedback to user's guess section id="feedback_container";
    let feedback = document.createElement("ul");
    feedback.setAttribute("id", "results");
    feedback.innerHTML = '<h5>Guess # ' + guessCount + ' Input: ' + rawInput + '</h5><h7><i class="bi bi-emoji-laughing"></i>\xa0' + aCount + ' correct number(s) on the right spot;\xa0\xa0\xa0</h7><h7><i class="bi bi-emoji-smile"></i>\xa0' + bCount + ' correct number(s) but on the wrong spot;\xa0\xa0\xa0</h7><h7><i class="bi bi-emoji-frown"></i>\xa0' + cCount + ' incorrect number(s).</h7><h6>You have ' + (attemptLeft-1) + ' attempt(s) left.</h6>';
    document.getElementById("feedback_container").appendChild(feedback);
    guessCount++;
    attemptLeft--;
    clearInput();
    // for last guess.
} else if (attemptLeft === 1) {
    for (let i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === answer[i]) {
           aCount++;
        }
    }
    bCount = userGuess.filter(e => answer.includes(e)).length - aCount;
    // Provide feedback to user's guess;
    let feedback = document.createElement("ul");
    feedback.setAttribute("id", "results");
    feedback.innerHTML = '<h5>Last Guess Input: ' + rawInput + '</h5><h7><i class="bi bi-emoji-laughing"></i>\xa0' + aCount + ' correct number(s) on the right spot;\xa0\xa0\xa0</h7><h7><i class="bi bi-emoji-smile"></i>\xa0' + bCount + ' correct number(s) but on the wrong spot;\xa0\xa0\xa0</h7><h7><i class="bi bi-emoji-frown"></i>\xa0' + cCount + ' incorrect number(s).</h7><h4><i class="bi bi-emoji-dizzy"></i> Sorry, you didn\'t break the code. The answer is ' + answer + '.</h4>';
    document.getElementById("feedback_container").appendChild(feedback);
    // Show the answer and ask if they want to play again.
    if (confirm("Sorry, you didn't get it.\nThe answer is " + answer + "\nClick 'OK' to play again.\nClick 'Cancel' to check your guesses history") == true) {
        resetGame();
    } else {
        handleCancel();
    }
}

}



//Icon used
    // <i class="bi bi-emoji-laughing"></i> A
    // <i class="bi bi-emoji-smile"></i>    B
    // <i class="bi bi-emoji-frown"></i>    C
    // <i class="bi bi-emoji-sunglasses"></i> Win
    // <i class="bi bi-emoji-dizzy"></i>    Lost







