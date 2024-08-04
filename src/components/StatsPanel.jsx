import { useContext } from "react";
import "./styles.css";
import { GameStats } from "../contexts";

export default function StatsPanel(props) {
    const gameStats = useContext(GameStats);
    const handleClick = () => {
        props.onClickRestart();
    }

    return (
        <div className="stats-panel" >
            <h1> <span className="red-font">Super</span> Tic Tac Toe! </h1>
            <p>Ходов: {gameStats.turns}, Игрок: {gameStats.isXTurn ? "X" : "0"} </p>
            <button onClick={handleClick}>Restart</button>
        </div>
    )
}