import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
	const [savedGames, setSavedGames] = useState([]);

	const addGame = (game) => {
		setSavedGames((prevGames) => [...prevGames, game]);
	};

	const removeGame = (gameId) => {
		setSavedGames((prevGames) =>
			prevGames.filter((game) => game.id !== gameId)
		);
	};

	return (
		<GameContext.Provider value={{ savedGames, addGame, removeGame }}>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => useContext(GameContext);
