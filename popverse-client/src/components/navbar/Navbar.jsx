import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4 text-dark" to="/">
            PopVerse
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <form className="d-flex mx-auto my-3 my-lg-0 w-50" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <button className="btn btn-outline-primary " type="submit">Buscar</button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-2">
              <li className="nav-item">
                <Link to="/login" className="nav-link text-dark">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/wishlist" className="nav-link text-dark">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link text-dark">Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-light border-top">
        <div className="container d-flex flex-wrap justify-content-center gap-3 py-2">
          <Link to="/category/movies" className="text-dark text-decoration-none px-3">Movies</Link>
          <Link to="/category/videogames" className="text-dark text-decoration-none px-3">VideoGames</Link>
          <Link to="/category/series" className="text-dark text-decoration-none px-3">Series</Link>
          <Link to="/category/anime" className="text-dark text-decoration-none px-3">Anime</Link>
          <Link to="/category/sport" className="text-dark text-decoration-none px-3">Sport</Link>
          <Link to="/category/music" className="text-dark text-decoration-none px-3">Music</Link>
          <Link to="/category/pokemon" className="text-dark text-decoration-none px-3">Pokémon</Link>
        </div>
      </div>
    </>
  );
}
