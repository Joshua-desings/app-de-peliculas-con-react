// MovieList.js
import React from 'react';

const URL_IMAGE = "https://image.tmdb.org/t/p/w300";

const MovieList = ({ movies, onMovieClick }) => {
  const showDetails = (movie) => {
    onMovieClick(movie);
  };

  return (
    <div className="container mt-3">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {movies.map((movie) => (
          <div key={movie.id} className="col" onClick={() => showDetails(movie)}>
            <div className="card h-100 border-0">
              {movie.poster_path ? (
                <img src={`${URL_IMAGE + movie.poster_path}`} className="card-img-top rounded" alt={movie.title} />
              ) : (
                <div className="text-center">
                  <p className="card-text">No se encontró la imagen del póster</p>
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title text-center text-white">{movie.title}</h5>
                {movie.release_date && (
                  <p className="card-text text-center text-secondary small">
                    Estreno: {new Date(movie.release_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
