import React, { useEffect } from 'react';
import '../App.css';

const Loader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    link.integrity = 'sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT';
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);

    return () => {
      // Limpiar el enlace cuando el componente se desmonte
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
