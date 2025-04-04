//custom hooks import
import { MoviesProvider } from "./contexts/moviesContext"

//components import
import MoviesPage from "./components/MoviesPage"

export default function App() {

  //return
  return (
    <>
      <MoviesProvider>
        <MoviesPage></MoviesPage>
      </MoviesProvider>
    </>
  )
}