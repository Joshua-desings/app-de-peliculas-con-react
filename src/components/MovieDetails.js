import React, { useState, useEffect } from 'react';
import tmdbService from '../services/tmdbService';
import YouTube from 'react-youtube';

const URL_IMAGE = "https://image.tmdb.org/t/p/original";
const IMAGE_PLACEHOLDER = "https://via.placeholder.com/150";

const MovieDetails = ({ movie, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdbService.get(`/movie/${movie.id}`, {
          params: {
            append_to_response: 'videos,credits',
            language: 'es',
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  // Función para obtener la clave del video de YouTube
  const getYoutubeVideoKey = () => {
    if (movieDetails && movieDetails.videos && movieDetails.videos.results.length > 0) {
      return movieDetails.videos.results[0].key;
    }
    return null;
  };

  return (
    <div>
      <button onClick={onClose} className="btn btn-primary mt-3">
        Volver 
      </button>
      {movieDetails && (
        <div>
          <h2>{movieDetails.title}</h2>
          <img
            src={`${URL_IMAGE + movieDetails.poster_path}`}
            alt={movieDetails.title}
            width="300"
          />
          <h3>Sinopsis</h3>
          <p>{movieDetails.overview}</p>
          <p>Género: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
          <p>Reparto principal:</p>
          <ul>
            {movieDetails.credits.cast.slice(0, 5).map((actor) => (
              <li key={actor.id}>
                <img
                  src={actor.profile_path ? `${URL_IMAGE + actor.profile_path}` : IMAGE_PLACEHOLDER}
                  alt={actor.name}
                  width="50"
                />
                {actor.name}
              </li>
            ))}
          </ul>
          {/* Reproductor de YouTube */}
          <div>
            <h3>Trailer</h3>
            {getYoutubeVideoKey() ? (
              <YouTube
                videoId={getYoutubeVideoKey()}
                opts={{ width: '100%', height: '400px' }}
              />
            ) : (
              <p>No hay trailer disponible para esta película.</p>
            )}
          </div>
          {/* Otros detalles como el género, etc. */}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
