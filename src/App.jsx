import { useState } from "react";
import "./App.css";

function App() {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const arr = ["0", "X"];
  const idx = Math.floor(Math.random() * 2);
  const [currentPlayer, setcurrentPlayer] = useState(arr[idx]);
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // function to update the cell
  const UpdateCell = (index) => {
    if (!isGameEnd && cells[index] === "") {
      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);
      if (calculateWin(newCells)) {
        setWinner(currentPlayer);
        setIsGameEnd(true);
        return;
      }
      setcurrentPlayer(currentPlayer === "X" ? "0" : "X");
    }
  };

  //function to check the winner
  const calculateWin = (board) => {
    for (const [a, b, c] of lines) {
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
        return true;
      }
    }
    // Check if the board is full and no one has won
    if (!board.includes("")) {
      setWinner("Tie");
      setIsGameEnd(true);
      return false; // No winner, but board is full
    }
    return false;
  };

  //function to display the messsage
  const handleWinMsg = () => {
    if (winner === "Tie") {
      return "It's a Tie!";
    } else if (isGameEnd) {
      return `${winner} Won`;
    }
    return `${currentPlayer} Turn`;
  };

  //funciton to reset the Game
  const handleClickBtn = () => {
    setWinner("");
    setCells(Array(9).fill(""));
    setIsGameEnd(false);
    setcurrentPlayer(arr[Math.floor(Math.random() * 2)]);
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[400px] mx-5 flex justify-center items-center flex-col">
        <h1 className="text-white font-bold text-3xl m-2 p-1">TIC TAC TOE</h1>
        <div className="text-white font-semibold m-1 p-3 text-2xl">{handleWinMsg()}</div>
        <div className="grid grid-cols-3 rounded-xl mb-6 overflow-hidden gap-1 w-full">
          {cells.map((cell, index) => (
            <div
              key={index}
              className="ffont-bold text-4xl text-white w-full aspect-square flex justify-center items-center cursor-pointer bg-gray-800 hover:bg-black rounded-md"
              onClick={() => UpdateCell(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <button
          className="w-full text-white border rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors duration-800 mb-3 p-2 text-xl font-bold cursor-pointer"
          onClick={() => handleClickBtn()}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default App;
