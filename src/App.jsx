import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import Log from './components/Log/Log.jsx';
import { GameOver } from './components/GameOver/GameOver.jsx';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './components/winningCombinations.js';

const SYMBOLS = ['X', 'O'];
const PLAYERS = { [SYMBOLS[0]]: 'Player 1', [SYMBOLS[1]]: 'Player 2' };
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

	// get active player based on gameTurns state.
	const activePlayer = deriveActivePlayer(gameTurns);

	// derive game board based on the gameTurns state.
	const gameBoard = deriveGameBoard(gameTurns);

	// derive winner based on the gameBoard passing players state for announcing the winner.
	const winner = deriveWinner(gameBoard, players);

	// check game draw when game raeched 9 moves and no winner was set.
	const hasDraw = gameTurns.length === 9 && !winner;

	// set to gameTurns state on each square clicked.
	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);
			return [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
		});
	};

	// save players names state.
	const handlePlayerNameChange = (symbol, newName) => {
		newName = formatName(newName);
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
					<Player initialName={PLAYERS[SYMBOLS[0]]} symbol={SYMBOLS[0]} isActive={activePlayer === SYMBOLS[0]} onChangeName={handlePlayerNameChange} />
					<Player initialName={PLAYERS[SYMBOLS[1]]} symbol={SYMBOLS[1]} isActive={activePlayer === SYMBOLS[1]} onChangeName={handlePlayerNameChange} />
				</ol>
				{(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematchClick} />}
				<GameBoard onSelectSquere={handleSelectSquare} gameBoard={gameBoard} />
			</div>
			<Log turns={gameTurns} playerNames={players} />
		</main>
	);
};

const deriveActivePlayer = (gameTurns) => {
	// default starter is 'X'.
	let currentPlayer = SYMBOLS[0];
	if (gameTurns.length > 0 && gameTurns[0].player === SYMBOLS[0]) {
		currentPlayer = SYMBOLS[1];
	}

	return currentPlayer;
};

const deriveWinner = (gameBoard, players) => {
	for (const combination of WINNING_COMBINATIONS) {
		// extract the gameBoard squeres check if combination exists in the winning combinations data.
		const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
		// if winner exists return the player name.
		if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
			return players[firstSquareSymbol];
		}
	}
	return null;
};

const deriveGameBoard = (gameTurns) => {
	//recreate the game board on each rerender based on the gameTurns state.
	const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}

	return gameBoard;
};

const formatName = (str) => {
	// Convert the first character to uppercase
	const firstLetter = str.charAt(0).toUpperCase();
	// Convert the rest of the characters to lowercase
	const restOfStr = str.slice(1).toLowerCase();
	// Concatenate the first uppercase letter with the rest of the string
	return firstLetter + restOfStr;
};

export default App;
