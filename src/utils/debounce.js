import { useEffect } from 'react';

export const useDebouncedEffect = (effect, dependencies, delay) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies); // Usa directamente 'dependencies' sin el operador de propagación
};


