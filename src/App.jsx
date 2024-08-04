import './App.css';
import { useState } from 'react';
import Cell from './components/Cell';
import { GameStats } from './contexts';
import StatsPanel from './components/StatsPanel';
import Rules from './components/Rules';


export default function App() {
  
  const [cells, setCells] = useState(new Array(9).fill(null)); //массив со значениями клеток
  const [gameStats, setGameStats] = useState({turns: 1, isXTurn: true, winner: null}); //общие статусы для компонентов

  //клик по клетке <Cell />
  const onClickCell = (id) => {

    cells[id] = gameStats.isXTurn ? "X" : "0"; // Х если очередь Х, иначе 0
    setCells([...cells]); // обновить значения клеток

    gameStats.turns ++; // текущий ход +1
    gameStats.isXTurn = !gameStats.isXTurn; // назначить ход другого игрока
    gameStats.winner = getWinner(cells); // проверить победителя
    setGameStats({...gameStats}); //обновить статусы
  }

  const onClickRestart = () => {
    setCells( cells.fill(null).slice() );
    setGameStats({turns: 1, isXTurn: true, winner: null});
  }
  
  //обернуть значения в компонент Cell
  const cellsList = cells.map( (element, index) => 
    (<Cell id={index} key={index} value={element} onClick = {onClickCell} />) 
  );

  return (
    <GameStats.Provider value={gameStats}>
      <StatsPanel cells={cells} onClickRestart={onClickRestart} />
      <div className='game-board'>
        {cellsList}
      </div>
      <Rules />
    </GameStats.Provider>

  );
}


function getWinner(cells) {
  const winCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
  ];

  const winner = winCombinations.find( ([a, b, c]) => {
    if ( cells[a] && cells[a] === cells[b] && cells[a] === cells[c] ) {
        return true;
    }
  });

  return winner || null;

}
