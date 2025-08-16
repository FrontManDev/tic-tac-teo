import { useState } from "react";
import styles from "./Came.module.css";
function Board({ isX, onClik }) {
    return (
        <div className={styles.buttons}>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
            <button onClick={onClik}><span>{isX ? "X" : "O"}</span></button>
        </div>
    )
}
export default function Game() {
    const [isX, SetisX] = useState(true);
    function HandelisX() {
        SetisX(!isX);
    }
    return (
        <div className={styles.container}>
            <h1>PLAYER X START</h1>
            <Board isX={isX} onClik={HandelisX} />
        </div>
    )
}