import { useState } from "react";
import styles from "./Came.module.css";
function Square({ value, onClick }) {
    return (
        <button onClick={onClick}>
            <span>{value}</span>
        </button>
    )
}
function Board() {
    const [isXTurn, SetisXTrun] = useState(true);
    const [TicTacTeo, SetTicTacTeo] = useState(Array(9).fill(""));

    function HandleTicTacTeo(value) {
        const Squares = [...TicTacTeo];
        Squares[value] =
            isXTurn ? Squares[value] = "X" : Squares[value] = "O"
        SetTicTacTeo(Squares);
        SetisXTrun(!isXTurn);
    }
    return (
        <div className={styles.buttons}>
            {TicTacTeo.map((value, index) => (<Square value={value} onClick={() => HandleTicTacTeo(index)} />))}
        </div>
    )
}
export default function Game() {
    return (
        <div className={styles.container}>
            <h1>PLAYER X START</h1>
            <Board />
        </div>
    )
}