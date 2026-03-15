import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query, where, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { localMovies, seedMovies } from '../firebase/seedMovies';

// Check if Firebase is configured with real credentials
const isFirebaseConfigured = () => {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return projectId && projectId !== 'your_project_id' && !projectId.includes('your_');
};

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seeded = useRef(false);

  useEffect(() => {
    // If Firebase is not configured, immediately use local data
    if (!isFirebaseConfigured()) {
      setMovies(localMovies);
      setLoading(false);
      return;
    }

    // Only run seed/sync once per component lifecycle
    if (!seeded.current) {
      seeded.current = true;
      seedMovies().catch(err => console.error('Seed error:', err));
    }

    const moviesRef = collection(db, 'movies');
    
    const unsub = onSnapshot(moviesRef, (snap) => {
      if (snap.empty) {
        setMovies(localMovies);
      } else {
        const data = snap.docs.map((doc) => ({ firestoreId: doc.id, ...doc.data() }));
        setMovies(data);
      }
      setLoading(false);
    }, (err) => {
      console.warn('Firestore error, using local data:', err.message);
      setMovies(localMovies);
      setLoading(false);
    });
    return unsub;
  }, []);

  return { movies, loading, error };
};
