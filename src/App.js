import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";

function App() {
  const [data, setData] = useState([]); // Start with an empty array
  const [inputValue, setInputValue] = useState(""); // State to hold the current input value
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winnerFound, setWinnerFound] = useState(false);

  const addData = () => {
    if (inputValue.trim()) {
      const randomColor = getRandomColor();
      const inputLength = inputValue.trim().length;

      // Truncate the input if it's longer than 27 characters
      const truncatedText =
        inputLength > 27 ? inputValue.trim().slice(0, 27) : inputValue.trim();

      // Calculate dynamic font size based on text length
      const dynamicFontSize = Math.max(12, 30 - truncatedText.length); // Minimum font size: 12px, Maximum: 30px

      setData((prevData) => [
        ...prevData,
        {
          option: truncatedText, // Use truncated text here
          style: {
            backgroundColor: randomColor,
            textColor: "black",
            fontSize: dynamicFontSize,
          },
        },
      ]);

      setInputValue(""); // Clear the input field
    }
  };

  // Helper function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSpinClick = () => {
    if (data.length > 0 && !mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setTimeout(() => {
        setWinnerFound(true);
      }, 10050);
    }
  };

  const spinAgain = () => {
    if (data.length > 0 && !mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setWinnerFound(false);
      setTimeout(() => {
        setWinnerFound(true);
      }, 10050);
    }
  };
  // console.log(data[prizeNumber]);
  const resetGame = () => {
    setInputValue(""); // Clear the input field
    setData([]); // Clear the data (wheel options)
    setWinnerFound(false); // Reset winner status
    setPrizeNumber(0); // Reset prize number
    setMustSpin(false); // Stop any ongoing spin
  };

  return (
    <div className="app-container">
      <div className="card-container">
        {data.length > 0 ? (
          <div className="wheel-container">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              spinDuration={1}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
          </div>
        ) : (
          <div className="empty-message">
            Add options to see the spinning wheel!
          </div>
        )}

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addData();
              }
            }}
            placeholder="Enter a new option"
            className="input-field"
          />
          <button onClick={addData} className="add-button">
            Add Option
          </button>
        </div>

        <button
          onClick={handleSpinClick}
          disabled={data.length === 0}
          className="spin-button"
        >
          SPIN
        </button>
        {winnerFound && (
          <div className="winner-message">
            <div>Winner: {data[prizeNumber].option}</div>
            <button onClick={resetGame} className="reset-button">
              Reset
            </button>
            <button onClick={spinAgain} className="spinAgain-button">
              Spin Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
