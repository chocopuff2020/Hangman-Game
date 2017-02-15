var A_ASCII = 65;
var ALPHABET_SIZE = 26;
var MAX_GUESSES = 6;
var WORD_BANK = [
	"cat",
	"dog",
	"bird",
	"fish",
	"bear",
	"pig",
]


function getRandomeWord() {
	return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}


function getButton(value, hasGuessed) {
	var button = document.createElement('button');
	button.className = 'button-primary';
	button.textContent = value;
	button.style.margin = '0.5em';
	button.style.padding = '0 28px';
	button.style.width = '62px';
	button.style.height = '62px';
	button.style.borderRadius = '50%';
	if (hasGuessed) {
		button.style.backgroundColor = 'gray';
	}
	return button;
}


function Game(options) {
	var currentWord = "CAT";
	var guessesLeft = 6;
	var guessed = ['z', 'r', 'x'];
	var letterContainer = document.querySelector('.section-letters');
	

	this.play = function() {
		currentWord = getRandomeWord().toUpperCase();
		guessed = [];
		guessesLeft = MAX_GUESSES;
		this.flush();
	}

	this.guessLetter = function(letter) {
		if (!guessed.includes(letter)) {
			guessed.push(letter);
			if (!currentWord.includes(letter)) {
				guessesLeft -= 1;
				document.getElementById("hangman").innerHTML = '<img src="./images/per' + guessesLeft + '.png">'
			}
			this.flush();
		}
	}

	this.isSolved = function() {
		return currentWord
			.split("")
			.reduce(function(acc, next){
				return acc && guessed.includes(next);
			}, true);
	}

	this.showCongratulations = function() {

	}


	this.flush = function() {
		this.drawButtons();
		this.showGuessesLeft();
		this.drawWordPreview();


		if (this.isSolved()) {
			var congrats = document.createElement('h1');
			congrats.textContent = 'CONGRATULATIONS!';
			congrats.style.textAlign = 'center';
			letterContainer.innerHTML = '';
			letterContainer.appendChild(congrats);
		}


		if (guessesLeft <= 0) {
			var loser = document.createElement('h1');
			loser.textContent = 'LOSER!';
			loser.style.textAlign = 'center';
			letterContainer.innerHTML = '';
			letterContainer.appendChild(loser);
		}
	}


	this.drawButtons = function() {
		var that = this;
		letterContainer.innerHTML = '';
		for (var i = 0; i < ALPHABET_SIZE; i++) {
			var letter = String.fromCharCode((A_ASCII + i));
			var hasGuessed = guessed.includes(letter);
			var button = getButton(letter, hasGuessed);
			button.addEventListener('click', function(e) {
				that.guessLetter(e.target.textContent);
			});
			letterContainer.appendChild(button);
		}
	}


	this.showGuessesLeft = function () {
		document.querySelector('#guesses-left').textContent = guessesLeft;
	}


	this.drawWordPreview = function() {
		var preview = currentWord
			.split('')
			.map(function(char) {
				if (guessed.includes(char)) {
					return char;
				}
				return '_';
			})
			.join(' ');
		document.querySelector('#word_preview').textContent = preview;
	}
}


