import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { localMovies } from '../firebase/seedMovies';

export const useMovie = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const docRef = doc(db, 'movies', id);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          setMovie({ firestoreId: snap.id, ...snap.data() });
        } else {
          const local = localMovies.find((m) => m.id === id);
          setMovie(local || null);
        }
      } catch (err) {
        console.warn('Error fetching movie, falling back to local:', err);
        const local = localMovies.find((m) => m.id === id);
        setMovie(local || null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading };
};
