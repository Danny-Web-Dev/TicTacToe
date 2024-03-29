const GameBoard = ({ onSelectSquere, turns }) => {
	let gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	for (const turn of turns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}
	return (
		<ol id='game-board'>
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() => {
										onSelectSquere(rowIndex, colIndex);
									}}
									disabled={playerSymbol !== null}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
};

export default GameBoard;
