import { useEffect, useState } from "react";
import styles from "./Came.module.css";

// Single square component — represents one cell of the Tic-Tac-Toe board
function Square({ value, onClick, WinnerCombo }) {
    return (
        // If this square is part of the winning combo, add a special CSS class
        <button onClick={onClick} className={WinnerCombo ? styles.WinningButton : ""}>
            <span>{value}</span>
        </button>
    )
}

// Board component — contains the 9 squares
function Board({ isXTurn, SetisXTrun, Squares, SetSquares, Winner, WinnerCombo }) {

    // Handles clicking on a square
    function HandleSquares(value) {
        // Only allow marking if the square is empty and there is no winner yet
        if (Squares[value] === "" && Winner === false) {
            // Make a copy of the squares array (to keep state immutable)
            const NextSquares = [...Squares];
            // Set current player's mark (X or O)
            NextSquares[value] = isXTurn ? "X" : "O"
            // Update state
            SetSquares(NextSquares);
            // Switch turn to the other player
            SetisXTrun(!isXTurn);
        }
        return;
    }

    return (
        // Render 9 squares dynamically from Squares array
        <div className={styles.buttons}>
            {Squares.map((value, index) => (
                <Square 
                    key={index} // Add key to avoid React warning
                    value={value}
                    onClick={() => HandleSquares(index)}
                    WinnerCombo={WinnerCombo.includes(index)} // Highlight if part of winning combo
                />
            ))}
        </div>
    )
}

export default function Game() {

    // Track whose turn it is (true = X's turn, false = O's turn)
    const [isXTurn, SetisXTrun] = useState(true);

    // Track the board state — 9 cells, initially empty strings
    const [Squares, SetSquares] = useState(Array(9).fill(""));

    // Track indices of winning squares if any
    const [WinnerCombo, SetWinerCombo] = useState([]);

    // Track winner state — can be false (no winner), "PLAYER X is Winner", "PLAYER O is Winner", or "Draw"
    const [Winner, SetWinner] = useState(false);

    // Reset the game to initial state
    function Reset() {
        SetSquares(Array(9).fill(""));
        SetWinner(false);
        SetWinerCombo([]);
        SetisXTrun(true);
    }

    // Check if there is a winner or a draw
    function IsWinner() {
        const ComboOfWinner = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // Loop through all possible winning combinations
        for (let [a, b, c] of ComboOfWinner) {
            // If all three positions are the same and not empty, we have a winner
            if (Squares[a] !== "" && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
                SetWinerCombo([a, b, c]); // Store winning indices for highlighting
                SetWinner(`PLAYER ${Squares[a]} is Winner`); // Announce winner
                return;
            }
        }

        // If no winner and the board is full → it's a draw
        IsFull() && SetWinner("Draw")
    }

    // Helper to check if the board is full
    function IsFull() {
        let Full = Squares.every(item => item !== "");
        return Full;
    }

    // Whenever Squares changes, check if we have a winner or draw
    useEffect(() => {
        IsWinner();
    }, [Squares]);

    return (
        <>
            <div className={styles.container}>
                {/* Show winner/draw message, or whose turn it is */}
                <h1>{Winner ? Winner : (isXTurn ? "PLAYER X turn " : "PLAYER O turn")}</h1>

                {/* Render the Board */}
                <Board
                    isXTurn={isXTurn}
                    SetisXTrun={SetisXTrun}
                    Squares={Squares}
                    SetSquares={SetSquares}
                    Winner={Winner}
                    WinnerCombo={WinnerCombo}
                />
            </div>

            {/* Reset button */}
            <div className={styles.resetbutton}>
                <button onClick={() => Reset()}>Reset</button>
            </div>
        </>
    )
}
