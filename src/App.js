import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import tmdbService from "./services/tmdbService";
import SearchBar from "./components/SearchBar";
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  const fetchPopularMovies = async () => {
    try {
      const response = await tmdbService.get("/movie/popular");
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const showDetails = async (movie) => {
    try {
      setLoading(true);
      const response = await tmdbService.get(`/movie/${movie.id}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const response = await tmdbService.get("/search/movie", {
        params: {
          query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    showDetails(movie);
  };

  const handleGoBack = () => {
    setSelectedMovie(null);
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      fetchPopularMovies();
    } else {
      searchMovies(query);
    }
  };

  return (
    <div
      style={{
        backgroundColor:
          currentTheme === "light" ? "rgb(255, 250, 250)" : "#333333",
        color: currentTheme === "light" ? "#000000" : "#ffffff",
      }}
    >
      <ThemeSwitcher onThemeChange={handleThemeChange} />
      <SearchBar onSearch={handleSearch} />
      <div className="content-container">
        {loading ? (
          <Loader />
        ) : selectedMovie ? (
          <MovieDetails movie={selectedMovie} onClose={handleGoBack} />
        ) : (
          <MovieList
            movies={movies}
            onMovieClick={handleMovieClick}
            theme={currentTheme}
          />
        )}
      </div>
    </div>
  );
}

export default App;
