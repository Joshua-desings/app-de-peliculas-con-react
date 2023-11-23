import React from 'react';

const URL_IMAGE = "https://image.tmdb.org/t/p/original";

const MovieList = ({ movies, onMovieClick }) => {
  const showDetails = (movie) => {
    onMovieClick(movie);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-3" onClick={() => showDetails(movie)}>
            {movie.poster_path ? (
              <>
                <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
                <h4 className="text-center">{movie.title}</h4>
              </>
            ) : (
              <div className="text-center">
                <p>No se encontró la imagen del póster</p>
                <h4>{movie.title}</h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

