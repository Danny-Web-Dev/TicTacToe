import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log/Log.jsx';
function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const symbols = ['X', 'O'];
	const playersInitailNames = ['Player 1', 'Player 2'];

	const [activePlayer, setActivePlayer] = useState(symbols[0]);

	const handleSelectSquare = (rowIndex, colIndex) => {
		setActivePlayer((currentActivePlayer) => (currentActivePlayer === symbols[0] ? symbols[1] : symbols[0]));

		setGameTurns((prevTurns) => {
			let currentPlayer = symbols[0];
			if (prevTurns.length > 0 && prevTurns[0].player === symbols[0]) {
				currentPlayer = symbols[1];
			}
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
				<GameBoard onSelectSquere={handleSelectSquare} activePlayerSymbol={activePlayer} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
}

export default App;
