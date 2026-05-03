import { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';

/**
 * Fetches the full portfolio from the backend once.
 */
export function usePortfolio() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    portfolioApi
      .getFullPortfolio()
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend is unavailable.', err.message);
        setLoading(false);
        setError('OFFLINE');
      });
  }, []);

  return { portfolio, loading, error };
}
