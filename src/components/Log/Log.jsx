import './Log.css';

const Log = ({ turns, playerNames }) => {
	return (
		<>
			<ol id='log'>
				{turns.map((turn) => (
					<li key={`${turn.square.row}${turn.square.col}`}>
						{playerNames[turn.player]} Selected row: {turn.square.row + 1}, column: {turn.square.col + 1}
					</li>
				))}
			</ol>
		</>
	);
};

export default Log;
