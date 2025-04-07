//custom hooks import
import { useMoviesContext } from "../contexts/moviesContext";

import Logo from '../assets/img/boolflix-logo.png';

export default function MoviesPage() {

  //logic
  const { series, movies, language, setLanguage, searchText,
    setSearchText, handleSubmit, actors, genres, getMovieActors,
    getMovieGenres, getSerieActors, getSerieGenres,
    genresList, setSelectedGenre } = useMoviesContext();

  //function to handle change of input
  function handleSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  //function to fetch datas
  function handleSearch() {
    handleSubmit();
  }

  //function to set language
  function handleLanguageChange(e) {
    setLanguage(e.target.value);
  }

  //function to get stars from the average vote
  function getStarsVote(avgVote) {

    const numberOfStars = Number((avgVote / 2).toFixed());
    const array = [];

    for (let i = 0; i < 5; i++) {
      if (i < numberOfStars) {
        array.push('fa-solid fa-star');
      } else {
        array.push('fa-regular fa-star');
      }
    }

    return array;
  }

  //function to get movie details
  function handleMovieDetails(id) {
    getMovieActors(id);
    getMovieGenres(id);
  }

  //function to get serie details
  function handleSerieDetails(id) {
    getSerieActors(id);
    getSerieGenres(id);
  }

  //function to set genre change
  function handleGenreChange(e) {
    setSelectedGenre(Number(e.target.value));
    console.log(e.target.value, Number(e.target.value));
  }


  //template
  return (
    <>
      <header>
        <div className="d-flex justify-content-between align-items-center px-5 py-3">
          <img id="logo" className="width-15" src={Logo} alt="logo image" />
          <div id="header_right" className="d-flex gap-3">
            <div className="d-flex gap-3">
              <input type="text"
                className="form-control"
                name="movie"
                id="movie"
                aria-describedby="movieHelper"
                placeholder="Search your movie here..."
                value={searchText}
                onChange={handleSearchTextChange} />
              <button onClick={handleSearch} type="button" className="btn btn-danger">Search</button>
            </div>

            <select
              className="form-select w-25"
              name="language"
              id="language"
              defaultValue={language}
              onChange={handleLanguageChange}>
              <option value="en-US">English</option>
              <option value="it-IT">Italiano</option>
              <option value="fr-FR">Francaise</option>
            </select>
          </div>
        </div>
      </header>

      <main className="bg-dark">
        <div className="container py-4">

          <div className="d-flex justify-content-between">
            <h2>Movies</h2>
            <select onChange={(e) => handleGenreChange(e)} className="mb-3" name="genres" id="genres">
              <option value="0">Select Genre</option>
              {
                genresList.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))
              }
            </select>
          </div>
          {
            (movies.length > 0) && (
              <div className="row row-cols-4 g-3 pb-5">
                {
                  movies.map(movie => (
                    <div key={movie.id} className="col">
                      <div className="card_container card h-100 border border-0">
                        <img className="img-fluid h-100" src={`https://image.tmdb.org/t/p/w342${movie.poster_path ? movie.poster_path : '/vFK3Ue8zAXpoWEqncKk5rcGd7RK.jpg'}`} alt="" />
                        <div onMouseEnter={() => handleMovieDetails(movie.id)} className="overlay">
                          <ul className="list-unstyled">
                            <li><strong>Titolo: </strong>{movie.title}</li>
                            <li><strong>Titolo originale: </strong>{movie.original_title}</li>
                            <li><strong>Lingua: </strong><span className={`fi fi-${movie.original_language}`}></span></li>
                            <li><strong>Voto: </strong>{getStarsVote(movie.vote_average).map((star, index) => (
                              <i key={`star-${index}`} className={star}></i>))}
                            </li>
                            <li><strong>{actors.length ? "Actors: " : ''}</strong>{actors.length ? actors.join(', ') : ''}</li>
                            <li><strong>Overview: </strong>{movie.overview}</li>
                            <li><strong>{genres.length ? "Genres: " : ''}</strong>{genres.length ? genres.join(', ') : ''}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }

          <div className="d-flex justify-content-between">
            <h2>TV Series</h2>
            <select onChange={(e) => handleGenreChange(e)} className="mb-3" name="genres" id="genres">
              <option value="0">Select Genre</option>
              {
                genresList.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))
              }
            </select>
          </div>          {
            (series.length > 0) && (
              <div className="row row-cols-4 g-3 pb-3">
                {
                  series.map(serie => (
                    <div key={serie.id} className="col">
                      <div className="card_container card h-100 border border-0">
                        <img className="img-fluid h-100" src={`https://image.tmdb.org/t/p/w342${serie.poster_path ? serie.poster_path : '/vFK3Ue8zAXpoWEqncKk5rcGd7RK.jpg'}`} alt="" />
                        <div onMouseEnter={() => handleSerieDetails(serie.id)} className="overlay">
                          <ul className="list-unstyled">
                            <li><strong>Nome: </strong>{serie.name}</li>
                            <li><strong>Nome originale: </strong>{serie.original_name}</li>
                            <li><strong>Lingua: </strong><span className={`fi fi-${serie.original_language}`}></span></li>
                            <li><strong>Voto: </strong>{getStarsVote(serie.vote_average).map((star, index) => (
                              <i key={`star-${index}`} className={star}></i>))}
                            </li>
                            <li><strong>{actors.length ? "Actors: " : ''}</strong>{actors.length ? actors.join(', ') : ''}</li>
                            <li><strong>Overview: </strong>{serie.overview}</li>
                            <li><strong>{genres.length ? "Genres: " : ''}</strong>{genres.length ? genres.join(', ') : ''}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }

        </div >
      </main >

    </>
  );
}