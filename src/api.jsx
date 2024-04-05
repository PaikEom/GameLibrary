import axios from "axios";

const fetchData = async (gameCategory, category, sortBy) => {
  const params = {};

  if (gameCategory) params.category = gameCategory;
  if (category) params.platform = category;
  if (sortBy) params["sort-by"] = sortBy;

  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    params: Object.keys(params).length ? params : null,
    headers: {
      "X-RapidAPI-Key": "Your API Key goes here",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchGamesByTag = async (gameCategory, platF) => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/filter",
    params: {
      tag: gameCategory,
      ...(platF ? { platform: platF } : {}),
    },
    headers: {
      "X-RapidAPI-Key": "Your Api key goes here",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getGameById = async (gameId) => {
  const options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    params: { id: gameId },
    headers: {
      "X-RapidAPI-Key": "Your Api key goes here",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchData, fetchGamesByTag, getGameById };
