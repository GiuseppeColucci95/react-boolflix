//custom hooks import
import { useEffect, useState } from "react";
import { useMoviesContext } from "../contexts/moviesContext";

export default function MoviesPage() {

  //use state variables
  const [search, setSearch] = useState('');

  //logic
  const { movies, searchText, setSearchText } = useMoviesContext();

  //function to handle change of input
  function handleChange(e) {
    setSearch(e.target.value);
  }

  //function to fetch datas
  function handleSearch() {
    setSearchText(search);
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
            value={search}
            onChange={handleChange} />

          <button onClick={handleSearch} type="button" className="btn btn-primary">Search</button>

        </div>

        {(movies.length > 0) && (
          <ul className="p-0">
            {
              movies.map(movie => (
                <div key={movie.id} className="card mb-2 p-2">
                  <ul className="m-0 p-0 list-unstyled">
                    <li>{movie.title}</li>
                    <li>{movie.original_title}</li>
                    <li>{movie.original_language}</li>
                    <li>{movie.vote_average}</li>
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