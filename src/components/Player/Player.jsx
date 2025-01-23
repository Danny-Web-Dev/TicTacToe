import { useState } from 'react';
import './Players.css';

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	// handling save player name and lifting name to state the is handled in App.jsx
	const handleEditClick = () => {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	};

	// handling two way binding for input name insertion.
	const handleChangeName = (e) => {
		setPlayerName(e.target.value);
	};

	return (
		<li className={isActive ? 'active' : null}>
			<span className='player'>
				{isEditing ? <input required value={playerName} onChange={handleChangeName} /> : <span className='player-name'>{playerName}</span>}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
};

export default Player;
