import { useRef, useState } from "react";
import "./Game.css";

const Game = ({ verifyLetter, pickedWord, pickedCategory,
  guessedLetters, wrongLetters, guesses, score, letters }) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter('');
    letterInputRef.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinha a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) => {
          return guessedLetters.includes(letter) ? (<span key={i} className="letter">{letter}</span>)
            : (<span key={i} className="blankSquare"></span>)
        })}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => {
          return <span key={i}>{letter}</span>
        })}
      </div>
    </div >
  )
}

export default Game