import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import Log from './components/Log/Log.jsx';
import { GameOver } from './components/GameOver/GameOver.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './components/winningCombinations.js';

const symbols = ['X', 'O'];
const PLAYERS = { [symbols[0]]: 'Player 1', [symbols[1]]: 'Player 2' };
const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const App = () => {
	// handling state for player names.
	const [players, setPlayers] = useState(PLAYERS);

	// handling state of board game data.
	const [gameTurns, setGameTurns] = useState([]);

	// get active player
	const activePlayer = deriveActivePlayer(gameTurns);

	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);
			return [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
		});
	};

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers((prevPlayerNames) => {
			return { ...prevPlayerNames, [symbol]: newName };
		});
	};

	const handleRematchClick = () => {
		setGameTurns([]);
	};

	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player initialName={PLAYERS[symbols[0]]} symbol={symbols[0]} isActive={activePlayer === symbols[0]} onChangeName={handlePlayerNameChange} />
					<Player initialName={PLAYERS[symbols[1]]} symbol={symbols[1]} isActive={activePlayer === symbols[1]} onChangeName={handlePlayerNameChange} />
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematchClick} />}
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

const deriveWinner = (gameBoard, players) => {
	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
		if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
			return players[firstSquareSymbol];
		}
	}
	return null;
};

const deriveGameBoard = (gameTurns) => {
	const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	return gameBoard;
};

export default App;
