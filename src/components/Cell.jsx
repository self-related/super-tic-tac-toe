import "./styles.css";
import { GameStats } from "../contexts";
import {useContext, useState} from "react";

export default function Cell( {value, id, onClick} ) {
    const [turnWhenChanged, setTurnWhenChanged] = useState(0); // ход, когда клетка была изменена
    const {turns, isXTurn, winner} = useContext(GameStats); // {все ходы, очередь игрока X, победитель}

    const isGameOver = winner != null; //есть ли уже победитель
    const isSameValue = value === "X" && isXTurn || value === "0" && !isXTurn; // присваивается ли то же значение
    const isUnavailable = (value) && (turns - turnWhenChanged < 5); // клетка недоступна в течение 4 ходов
    const isCenterUnavailable = id === 4 && turns < 6; // центр недоступен первые 5 ходов

    const handleClick = () => {
        if (isGameOver || isSameValue || isUnavailable || isCenterUnavailable) { return; }
        setTurnWhenChanged(turns); // ход, когда клетка изменена = текущий ход
        onClick(id);
    }

    let className = "cell";
    if ( (value && isUnavailable) || isCenterUnavailable ) {
        className += " unavailable"; //сделать клетку серой, когда недоступна
    }

    if ( winner?.includes(id) )  {
        className += " winner"; //сделать клетку зеленой
    }


    return (
        <button className={className} onClick={handleClick}>{value ?? ""}</button>
    );
}