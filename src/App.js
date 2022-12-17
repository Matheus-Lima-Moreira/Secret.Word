// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from "react";

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

const guessesQtd = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  const pickWordandCategory = () => {
    // Pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Pick a random word from the category
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }

  // starts the secret word game
  const startGame = () => {
    // pick a random word and category
    const { word, category } = pickWordandCategory();

    // create an array of letters
    const wordLetters = word.toLowerCase().split('');

    // set the states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // restarts the game
  const restart = () => {
    setScore(0);
    setGuesses(guessesQtd);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          letters={letters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <GameOver restart={restart} score={score} />}
    </div>
  );
}

export default App;