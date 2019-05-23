var wordsArray = ['skate', 'program', 'oakland', 'thomas', 'winner']
var wordToGuess = ''
var lettersInWordToGuess = []
var blankSpaces = 0
var blanksAndLetters = []
var wrongGuesses = []
var wins = 0
var losses = 0
var guessesLeft = 9

const startGame = () => {
  guessesLeft = 9
  wordToGuess = wordsArray[Math.floor(Math.random() * wordsArray.length)]
  lettersInWordToGuess = wordToGuess.split('')
  blankSpaces = lettersInWordToGuess.length
  blanksAndLetters = []
  wrongGuesses = []

  for (var i = 0; i < blankSpaces; i++) {
    blanksAndLetters.push('_')
  }

  document.getElementById('guesses-left').innerHTML = guessesLeft
  document.getElementById('word-blanks').innerHTML = blanksAndLetters.join(' ')
  document.getElementById('wrong-guesses').innerHTML = wrongGuesses.join(' ')
}

const checkLetter = letter => {
  var letterInWord = false

  for (var i = 0; i < blankSpaces; i++) {
    if (wordToGuess[i] === letter) {
      letterInWord = true
    }
  }

  if (letterInWord) {
    for (var j = 0; j < blankSpaces; j++) {
      if (wordToGuess[j] === letter) {
        blanksAndLetters[j] = letter
      }
    }
  } else {
    wrongGuesses.push(letter)
    guessesLeft--
  }
}

const gameFinished = () => {
  document.getElementById('guesses-left').innerHTML = guessesLeft
  document.getElementById('word-blanks').innerHTML = blanksAndLetters.join(' ')
  document.getElementById('wrong-guesses').innerHTML = wrongGuesses.join(' ')

  if (lettersInWordToGuess.toString() === blanksAndLetters.toString()) {
    wins++
    alert('You win!')
    document.getElementById('wins').innerHTML = wins
    startGame()
  } else if (guessesLeft === 0) {
    losses++
    alert('You lose')
    document.getElementById('losses').innerHTML = losses
    startGame()
  }
}

startGame()

document.onkeyup = function(event) {
  var letterGuessed = event.key.toLowerCase()
  checkLetter(letterGuessed)
  gameFinished()
}
