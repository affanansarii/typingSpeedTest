import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "React makes it painless to create interactive UIs.",
  "JavaScript is a versatile programming language.",
  "A journey of a thousand miles begins with a single step.",
  "Practice makes perfect in typing speed."
];

function App() {

  const [currentSentence, setCurrentSentence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [bestWpm, setBestWpm] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [errorIndex, setErrorIndex] = useState(-1);

  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
  }, []);

  useEffect(() => {
    if (userInput.length === 1 && startTime === null) {
      setStartTime(new Date());
    }

    if (userInput === currentSentence) {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000 / 60;
      const wordCount = currentSentence.split(" ").length;
      const calculatedWpm = Math.round(wordCount / timeTaken);
      setWpm(calculatedWpm);

      if (calculatedWpm > bestWpm) {
        setBestWpm(calculatedWpm);
      }

      setIsComplete(true);
    }
  }, [userInput, currentSentence, startTime, bestWpm]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    setIsComplete(false);
    setWpm(null);

    if (!currentSentence.startsWith(input)) {
      setErrorIndex(input.length - 1);
    } else {
      setErrorIndex(-1);
    }
  };

  const handleReset = () => {
    setUserInput("");
    setStartTime(null);
    setWpm(null);
    setIsComplete(false);
    setErrorIndex(-1);
    setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    inputRef.current.focus();
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Typing Speed Test</h2>
      <p>Type the following sentences as quickly as you can:</p>
      <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#333' }}>{currentSentence}</p>

      <input
        ref={inputRef}
        type='text'
        value={userInput}
        onChange={handleInputChange}
        placeholder='Start typing here...'
        style={{ width: '100%', padding: '10px', fontSize: '1.2em', borderColor: errorIndex >= 0 ? 'red' : '#ccc', outline: 'none' }}
        autoFocus
      />

      {errorIndex >= 0 && (
        <p style={{ color: 'red' }}>Check your typing! There's a mistake.</p>
      )}

      {isComplete && (
        <div style={{ marginTop: '20px', color: '#28a745' }}>
          <h3>Congratulations!</h3>
          <p>You typed at {wpm} WPM!</p>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleReset} style={{ padding: '10px 20px', fontSize: '1em' }}>Reset</button>
      </div>

      {bestWpm > 0 && (
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Your best WPM score: {bestWpm}</p>
      )}
    </div>
  );
}

export default App;
