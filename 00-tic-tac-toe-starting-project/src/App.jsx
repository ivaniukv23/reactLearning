import { useState } from "react"

import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = "O";
  }
  return currentPlayer;
}


function deriveWinner(gameBoard, players) {
  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymb = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymb = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymb = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymb && firstSquareSymb === secondSquareSymb && firstSquareSymb === thirdSquareSymb) {
      winner = players[firstSquareSymb];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  

  for(const turn of gameTurns) {
      const {square, player} = turn
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
  
  return gameBoard;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([])
    
  
  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer}, 
        ...prevGameTurns
      ];
      console.log(players)
      return updatedTurns;
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handleChangeName(newName, playerSymbol) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [playerSymbol] : newName
      }
    })
  }

  
  
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">  
        <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handleChangeName}/>
        <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handleChangeName}/>
      </ol>
      {(hasDraw || winner) && <GameOver winner={winner} restart={handleRestartGame}/>}
      <GameBoard 
        onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}
        board={gameBoard}  
      />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
