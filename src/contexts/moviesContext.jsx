//hooks import from react
import { createContext, useContext, useEffect, useState } from "react";

//creation of the context
const MoviesContext = createContext();

//function to return the custom provider component
function MoviesProvider({ children }) {

  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  //variables to use
  const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;
  const base_movies_api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=${language}&query=${searchText}`;
  const base_series_api_url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=${language}&query=${searchText}`;

  //function to fetch datas on button click
  function handleSubmit() {
    console.log(base_movies_api_url);
    //first fetch for movies
    fetch(base_movies_api_url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      })
      .catch(err => console.error(err));

    console.log(base_series_api_url);
    //second fetch for series
    fetch(base_series_api_url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSeries(data.results);
      })
      .catch(err => console.error(err));
  }

  return (
    <MoviesContext.Provider value={{ movies, series, language, setLanguage, searchText, setSearchText, handleSubmit }}>
      {children}
    </MoviesContext.Provider>
  );
}

//function to use custom provider
function useMoviesContext() {
  const context = useContext(MoviesContext);
  return context;
}

//export of custom provider
export { MoviesProvider, useMoviesContext };