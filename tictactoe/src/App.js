// Imports useState hook from react library, allows us to add state to functional components
import { useState } from 'react';

// Square component represents a square in the board
// Recieves two props 'value' and 'onSquareClick'
function Square({ value, onSquareClick }) {
  return (
    // square is rendered as a button element with 'square' class
    // when the button is clicked, the 'onSquareClick' function is called
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// 'Board' component represents the tic-tac-toe board
// Recieves 3 props: 'xIsNext', 'squares', and 'onPlay'
function Board({ xIsNext, squares, onPlay }) {
  // Function called when a square is clicked
  function handleClick(i) {
    // If there is a winner or the square is already filled, return early
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of the squares array
    const nextSquares = squares.slice();
    // Set the value of the clicked square based on the player
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Call the onPlay function to update the game state
    onPlay(nextSquares);
  }

  // Calculate the winner
  const winner = calculateWinner(squares);

  let status;
  if (winner) {
    // If there is a winner, display the winner
    status = 'Winner: ' + winner;
  } else {
    // If there is no winner, display the next player
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      {/* Display the status */}
      <div className="status">{status}</div>
      {/* Render the board rows */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game component that renders the entire tic-tac-toe game
export default function Game() {
  // State for the game history and current move
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // Determine the current player
  const xIsNext = currentMove % 2 === 0;
  // Get the squares for the current move
  const currentSquares = history[currentMove];

  // Function called when a move is made
  function handlePlay(nextSquares) {
    // Create a new history with the updated squares
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Update the history and current move state
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function called when a move is selected from the move list
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Generate the move list
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    // Render a button for each move
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Render the game board */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* Render the move list */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // Iterate over each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If the squares at these positions match and are not null, return the winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If there is no winner, return null
  return null;
}




// // created a component to be reused
// export default function Board() {
//   const [xIsNext, setXIsNext] = useState(true);
//   // Declares a state variable named squares that defaults to an array of 9 nulls for 9 squares
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   // Defining the handleClick function inside the Board component to update squares array 
//   // handleClick updates the nextSquares array to add x to the first ([0] index) square.
//   // Calling the setSquares function lets React know the state of the component changed. 
//   // Triggers a re - render of the components that use the squares state(Board) as well as its child components (the Square components that make up the board).
//   function handleClick(i) {
//     if (squares[i] || calculateWinner(squares)) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = "X";
//     } else {
//       nextSquares[i] = "O";
//     }
//     setSquares(nextSquares);
//     setXIsNext(!xIsNext);
//   }
//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     // Use fragments in order to create multiple squares and not have error code (need to return single JSX elements)
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row"></div>
//       {/* In order to create 3 rows of 3 we wrap them in divs */}
//       <div className="board-row">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }