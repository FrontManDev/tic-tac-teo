import { useEffect, useState } from "react";
import styles from "./Came.module.css";

function Square({ value, onClick, WinnerCombo }) {
    return (
        <button onClick={onClick} className={WinnerCombo ? styles.WinningButton : ""}>
            <span>{value}</span>
        </button>
    )
}

function Board({ isXTurn, SetisXTrun, Squares, SetSquares, IsWinner, Winner, WinnerCombo }) {

    function HandleSquares(value) {
        if (Squares[value] === "" && Winner === false) {
            const NextSquares = [...Squares];
            NextSquares[value] = isXTurn ? "X" : "O"
            SetSquares(NextSquares);
            SetisXTrun(!isXTurn);
            IsWinner();
        }
        return;
    }

    return (
        <div className={styles.buttons}>
            {Squares.map((value, index) => (
                <Square value={value}
                    onClick={() => HandleSquares(index)}
                    WinnerCombo={WinnerCombo.includes(index)}
                />))}
        </div>
    )
}

export default function Game() {

    const [isXTurn, SetisXTrun] = useState(true);
    const [Squares, SetSquares] = useState(Array(9).fill(""));
    const [WinnerCombo, SetWinerCombo] = useState([]);
    const [Winner, SetWinner] = useState(false);
    function Reset() {
        SetSquares(Array(9).fill(""));
        SetWinner(false);
        SetWinerCombo([]);
        SetisXTrun(true);
    }


    function IsWinner() {

        const ComboOfWinner = [
            [0, 1, 2], [3, 4, 5],
            [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let [a, b, c] of ComboOfWinner) {
            if (Squares[a] !== "" && Squares[a] === Squares[b] && Squares[a] === Squares[c]) {
                SetWinerCombo([a, b, c]);
                SetWinner(`PLAYER ${Squares[a]} is Winner`);
                return;
            }
        }
        IsFull() && SetWinner("Draw")
    }

    function IsFull() {
        let Full = Squares.every(item => item !== "");
        if (Full) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        IsWinner();
    }, [Squares]);
    return (
        <>
            <div className={styles.container}>
                <h1>{Winner ? Winner : (isXTurn ? "PLAYER X turn " : "PLAYER O turn")}</h1>
                <Board
                    isXTurn={isXTurn}
                    SetisXTrun={SetisXTrun}
                    IsWinner={IsWinner}
                    Squares={Squares}
                    SetSquares={SetSquares}
                    Winner={Winner}
                    WinnerCombo={WinnerCombo}
                />
            </div>
            <div className={styles.resetbutton}>
                <button onClick={() => Reset()}>Reset</button>
            </div>
        </>
    )
}