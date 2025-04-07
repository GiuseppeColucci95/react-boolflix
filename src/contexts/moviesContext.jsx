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
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

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

  //function to return cast for a movie
  function getMovieActors(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2JlZDVmZDM4NWFjY2Q5Zjg2OGQzNmYxNzZkNWJhNyIsIm5iZiI6MTc0Mzc1NTkwMy45MzEsInN1YiI6IjY3ZWY5YTdmY2JkNTViNjYxZmQ5MjFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zL-Zef1BbD31v3fS3Rg8SerMdOPkxQZJnT-aIQzGzY'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.cast.slice(0, 5));

        const actorsToSet = data.cast.slice(0, 5);
        const actorsNames = actorsToSet.map(actor => actor.name);

        setActors(actorsNames);
      })
      .catch(err => console.error(err));
  }

  //function to return genres for a movie
  function getMovieGenres(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2JlZDVmZDM4NWFjY2Q5Zjg2OGQzNmYxNzZkNWJhNyIsIm5iZiI6MTc0Mzc1NTkwMy45MzEsInN1YiI6IjY3ZWY5YTdmY2JkNTViNjYxZmQ5MjFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zL-Zef1BbD31v3fS3Rg8SerMdOPkxQZJnT-aIQzGzY'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.genres);

        const genresToSet = data.genres;
        const genresNames = genresToSet.map(genre => genre.name);

        setGenres(genresNames);
      })
      .catch(err => console.error(err));
  }

  //function to return cast for a serie
  function getSerieActors(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2JlZDVmZDM4NWFjY2Q5Zjg2OGQzNmYxNzZkNWJhNyIsIm5iZiI6MTc0Mzc1NTkwMy45MzEsInN1YiI6IjY3ZWY5YTdmY2JkNTViNjYxZmQ5MjFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zL-Zef1BbD31v3fS3Rg8SerMdOPkxQZJnT-aIQzGzY'
      }
    };

    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=${language}`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.cast.slice(0, 5));

        const actorsToSet = data.cast.slice(0, 5);
        const actorsNames = actorsToSet.map(actor => actor.name);

        setActors(actorsNames);
      })
      .catch(err => console.error(err));
  }

  //function to return genres for a serie
  function getSerieGenres(id) {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2JlZDVmZDM4NWFjY2Q5Zjg2OGQzNmYxNzZkNWJhNyIsIm5iZiI6MTc0Mzc1NTkwMy45MzEsInN1YiI6IjY3ZWY5YTdmY2JkNTViNjYxZmQ5MjFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zL-Zef1BbD31v3fS3Rg8SerMdOPkxQZJnT-aIQzGzY'
      }
    };

    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.genres);

        const genresToSet = data.genres;
        const genresNames = genresToSet.map(genre => genre.name);

        setGenres(genresNames);
      })
      .catch(err => console.error(err));
  }

  return (
    <MoviesContext.Provider value={{ movies, series, language, setLanguage, searchText, setSearchText, handleSubmit, actors, genres, getMovieActors, getMovieGenres, getSerieActors, getSerieGenres }}>
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