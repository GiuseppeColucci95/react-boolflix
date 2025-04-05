//custom hooks import
import { useMoviesContext } from "../contexts/moviesContext";

export default function MoviesPage() {

  //logic
  const { series, movies, language, setLanguage, searchText, setSearchText, handleSubmit } = useMoviesContext();

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

  //template
  return (
    <>
      <div className="container my-5">

        <div className="div d-flex justify-content-between">
          <h1>Boolflix</h1>

          <div className="mb-3">
            <select
              className="form-select"
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

        <div className="mb-3 d-flex gap-3">
          <input
            type="text"
            className="form-control"
            name="movie"
            id="movie"
            aria-describedby="movieHelper"
            placeholder="Type your movie here"
            value={searchText}
            onChange={handleSearchTextChange} />

          <button onClick={handleSearch} type="button" className="btn btn-danger">Search</button>

        </div>

        {(movies.length > 0) && (
          <ul className="p-0">
            {
              movies.map(movie => (
                <div key={movie.id} className="card mb-2 p-2">
                  <img className="card-img-top img-fluid" src={`https://image.tmdb.org/t/p/w342${movie.poster_path ? movie.poster_path : '/vFK3Ue8zAXpoWEqncKk5rcGd7RK.jpg'}`} alt="" />
                  <ul className="m-0 p-0 list-unstyled">
                    <li>{`Titolo: ${movie.title}`}</li>
                    <li>{`Titolo originale: ${movie.original_title}`}</li>
                    <li>{`Lingua: `}<span className={`fi fi-${movie.original_language}`}></span></li>
                    <li>
                      {`Voto: `}{getStarsVote(movie.vote_average).map((star, index) => (
                        <i key={`star-${index}`} className={star}></i>))}
                    </li>
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
                  <img className="card-img-top img-fluid" src={`https://image.tmdb.org/t/p/w342${serie.poster_path ? serie.poster_path : '/vFK3Ue8zAXpoWEqncKk5rcGd7RK.jpg'}`} alt="" />
                  <ul className="m-0 p-0 list-unstyled">
                    <li>{`Nome: ${serie.name}`}</li>
                    <li>{`Nome originale: ${serie.original_name}`}</li>
                    <li>{`Lingua: `}<span className={`fi fi-${serie.original_language}`}></span></li>
                    <li>
                      {`Voto: `}{getStarsVote(serie.vote_average).map((star, index) => (
                        <i key={`star-${index}`} className={star}></i>))}
                    </li>
                  </ul>
                </div>
              ))
            }
          </ul>
        )}

      </div >
    </>
  );
}