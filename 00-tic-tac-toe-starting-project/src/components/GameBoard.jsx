import { useState } from "react";


export default function GameBoard({onSelectSquare, board}) {

    
    // const [gameBoard, setGameBoard] = useState(initGameBoard);

    // function handleSelectSquare(row, col) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[row][col] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare(row, col);
    // }

    return(
        <ol id="game-board">
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => 
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                                    {playerSymbol}
                                </button>
                            </li>
                        )}
                    </ol>
                </li>)}
        </ol>
    )
}