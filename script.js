import { startConfetti, stopConfetti, removeConfetti } from "./modules/confetti.js";

const computerOptions = document.querySelectorAll(`[id^='computer-']`);
const playerOptions = document.querySelectorAll(`[id^='player-']`);
const allGameIcons = document.querySelectorAll('.far');
const resetAll = document.getElementById('resetAll');

const playerChoiceEl = document.getElementById('playerChoice');
const playerScoreEl = document.getElementById('playerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const computerScoreEl = document.getElementById('computerScore');

const resultText = document.getElementById('result-text');

let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0; 

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// Extra functions
const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
}

// Computer give a choice
const computerRandomChoice = () => {
  const computerRandomNumber = Math.floor(Math.random() * 5);
  computerChoice = Object.keys(choices)[computerRandomNumber];
  computerOptions[computerRandomNumber].classList.add('selected');
  computerChoiceEl.textContent = ` --- ${capitalize(computerChoice)}`;
} 

// Reset all 'selected' icon
const resetSelected = () => {
  stopConfetti();
  allGameIcons.forEach((icon) => {
    if(icon.classList.contains('selected'))
      icon.classList.remove('selected');
  });
  removeConfetti();
}

// Reset All
const resetScore = () => {
  resetSelected();
  computerScoreNumber = playerScoreNumber = 0;
  computerScoreEl.textContent = computerScoreNumber;
  playerScoreEl.textContent = playerScoreNumber;
  computerChoice = '';
  playerChoiceEl.textContent = computerChoiceEl.textContent = ' --- Choice';
  resultText.textContent = `Win me if you can :D`;
}

// Update score, check result + increase score
const updateScore = (playerChoice) => {
  if(playerChoice === computerChoice) {
    resultText.textContent = "It's a tie!";
  } else {
    if (choices[playerChoice].defeats.includes(computerChoice)) {
      startConfetti();
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost.";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
}

// Call functions to process turn
const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  updateScore(playerChoice);
}

// Passing player selection value and styling icons
const select = (option) => {
  checkResult(option);
  // Add 'selected' styling & playerChoice
  switch (option) {
    case 'rock':
      playerOptions[0].classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerOptions[1].classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerOptions[2].classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerOptions[3].classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock' :
      playerOptions[4].classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

// Event Listener
resetAll.addEventListener('click', resetScore);  
playerOptions.forEach(option => {
  option.addEventListener('click', () => {
    select(option.title.toLowerCase());
  })
})

// On Startup set Init value
resetScore();

const get_func = (data) =>{ 
  alert(data);
}

window.get_func = get_func;