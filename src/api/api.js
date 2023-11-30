const giphyTrendingURl = "https://api.giphy.com/v1/gifs/trending";
const giphySearchURL = "https://api.giphy.com/v1/gifs/search";

const trending = () =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${giphyTrendingURl}?api_key=${
        process.env.EXPO_PUBLIC_GIPHY_API_KEY
      }&limit=${20}`;
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        resolve(result);
      } else {
        reject(`${response.status}:${response.statusText}`);
      }
    } catch (error) {
      reject(error);
    }
  });

const search = (query, offset) =>
  new Promise(async (resolve, reject) => {
    let url = `${giphySearchURL}?api_key=${
      process.env.EXPO_PUBLIC_GIPHY_API_KEY
    }&q=${query}&limit=${20}`;

    try {
      const response = await fetch(offset ? `${url}?offset=${offset}` : url);
      if (response.ok) {
        const result = await response.json();
        resolve(result);
      } else {
        reject(`${response.status}:${response.statusText}`);
      }
    } catch (error) {
      reject(error);
    }
  });

export const API = { search, trending };
