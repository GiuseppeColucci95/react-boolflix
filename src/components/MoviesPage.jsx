//custom hooks import
import { useMoviesContext } from "../contexts/moviesContext";

export default function MoviesPage() {

  //logic
  const { searchText, setSearchText } = useMoviesContext();


  //return
  return (
    <>
      <h1>Boolflix</h1>

    </>
  );
}