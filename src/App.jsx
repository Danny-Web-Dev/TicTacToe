import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import Log from './components/Log/Log.jsx';
import { GameOver } from './components/GameOver/GameOver.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './components/winningCombinations.js';

const symbols = ['X', 'O'];
const playersInitailNames = ['Player 1', 'Player 2'];

const App = () => {
	let winner = null;
	const [gameTurns, setGameTurns] = useState([]);
	const activePlayer = deriveActivePlayer(gameTurns);

	let gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
		if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
			winner = firstSquareSymbol;
		}
	}

	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);
			return [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
		});
	};
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player initialName={playersInitailNames[0]} symbol={symbols[0]} isActive={activePlayer === symbols[0]} />
					<Player initialName={playersInitailNames[1]} symbol={symbols[1]} isActive={activePlayer === symbols[1]} />
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} />}
				<GameBoard onSelectSquere={handleSelectSquare} gameBoard={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
};

const deriveActivePlayer = (gameTurns) => {
	let currentPlayer = symbols[0];
	if (gameTurns.length > 0 && gameTurns[0].player === symbols[0]) {
		currentPlayer = symbols[1];
	}

	return currentPlayer;
};

export default App;
