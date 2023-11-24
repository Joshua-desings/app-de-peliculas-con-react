import React, { useState, useEffect } from "react";
import Header from "./components/Header"; 
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import tmdbService from "./services/tmdbService";
import "./App.css";

const ThemeSwitcher = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    onThemeChange(isDarkMode ? "light" : "dark");
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <button
      onClick={toggleTheme}
      style={{
        fontSize: isMobile ? "30px" : "50px",
        cursor: "pointer",
        background: "none",
        border: "none",
        outline: "none",
        position: "absolute",
        top: "0px",
        right: "10px",
      }}
    >
      {isDarkMode ? (
        <span role="img" aria-label="Sol" style={{ marginRight: "5px" }}>
          ☀️
        </span>
      ) : (
        <span role="img" aria-label="Luna" style={{ marginRight: "5px" }}>
          🌙
        </span>
      )}
    </button>
  );
};

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

  useEffect(() => {
    fetchPopularMovies();
  }, []);

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
      <Header onThemeChange={handleThemeChange} onSearch={handleSearch} />
      <ThemeSwitcher onThemeChange={handleThemeChange} />
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
