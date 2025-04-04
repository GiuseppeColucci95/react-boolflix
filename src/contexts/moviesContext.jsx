//hooks import from react
import { createContext, useContext, useEffect, useState } from "react";


//creation of the context
const MoviesContext = createContext();

//function to return the custom provider component
function MoviesProvider({ children }) {

  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);

  //variables to use
  const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;
  const base_movies_api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`;

  useEffect(() => {
    fetch(base_movies_api_url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, setMovies, searchText, setSearchText }}>
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