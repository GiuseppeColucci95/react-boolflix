//custom hooks import
import { useEffect, useState } from "react";
import { useMoviesContext } from "../contexts/moviesContext";

export default function MoviesPage() {

  //logic
  const { series, movies, searchText, setSearchText, handleSubmit } = useMoviesContext();

  //function to handle change of input
  function handleChange(e) {
    setSearchText(e.target.value);
  }

  //function to fetch datas
  function handleSearch() {
    handleSubmit();
  }

  //template
  return (
    <>
      <div className="container my-5">

        <h1>Boolflix</h1>

        <div className="mb-3 d-flex gap-3">
          <input
            type="text"
            className="form-control"
            name="movie"
            id="movie"
            aria-describedby="movieHelper"
            placeholder="Type your movie here"
            value={searchText}
            onChange={handleChange} />

          <button onClick={handleSearch} type="button" className="btn btn-danger">Search</button>

        </div>

        {(movies.length > 0) && (
          <ul className="p-0">
            {
              movies.map(movie => (
                <div key={movie.id} className="card mb-2 p-2">
                  <ul className="m-0 p-0 list-unstyled">
                    <li>{`Titolo: ${movie.title}`}</li>
                    <li>{`Titolo originale: ${movie.original_title}`}</li>
                    <li>{`Lingua: `}<span className={`fi fi-${movie.original_language}`}></span></li>
                    <li>{`Voto: ${movie.vote_average}`}</li>
                  </ul>
                </div>
              ))
            }
          </ul>
        )}

        {(series.length > 0) && (
          <ul className="p-0">
            {
              series.map(serie => (
                <div key={serie.id} className="card mb-2 p-2">
                  <ul className="m-0 p-0 list-unstyled">
                    <li>{`Titolo: ${serie.name}`}</li>
                    <li>{`Titolo originale: ${serie.original_name}`}</li>
                    <li>{`Lingua: `}<span className={`fi fi-${serie.original_language}`}></span></li>
                    <li>{`Voto: ${serie.vote_average}`}</li>
                  </ul>
                </div>
              ))
            }
          </ul>
        )}

      </div>
    </>
  );
}