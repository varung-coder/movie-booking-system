import { db } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const movies = [
  {
    id: 'movie1',
    title: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    language: 'English',
    rating: 8.5,
    duration: '166 min',
    year: 2024,
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'Zendaya', role: 'Chani', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['10:00 AM', '1:30 PM', '5:00 PM', '9:00 PM'], price: 250 },
      { date: '2024-03-16', times: ['11:00 AM', '2:30 PM', '6:00 PM', '10:00 PM'], price: 250 },
    ],
    featured: true,
  },
  {
    id: 'movie2',
    title: 'Oppenheimer',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    description: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    genres: ['Biography', 'Drama', 'History'],
    language: 'English',
    rating: 9.0,
    duration: '180 min',
    year: 2023,
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' },
      { name: 'Matt Damon', role: 'Gen. Leslie Groves', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['9:30 AM', '1:00 PM', '4:30 PM', '8:00 PM'], price: 300 },
      { date: '2024-03-16', times: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'], price: 300 },
    ],
    featured: true,
  },
  {
    id: 'movie13',
    title: 'Leo',
    poster: '/posters/leo.png',
    backdrop: 'https://placehold.co/1200x600/1a1a35/e50914?text=Leo',
    description: 'A mild-mannered cafe owner becomes a local hero, but his past soon catches up with him as he is targeted by a powerful gang who believes he is their former associate.',
    genres: ['Action', 'Thriller', 'Crime'],
    language: 'Tamil',
    rating: 8.8,
    duration: '164 min',
    year: 2023,
    cast: [
      { name: 'Vijay', role: 'Parthiban / Leo', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Trisha Krishnan', role: 'Sathya', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Sanjay Dutt', role: 'Antony Das', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['10:30 AM', '2:00 PM', '6:00 PM', '10:00 PM'], price: 250 },
      { date: '2024-03-16', times: ['11:00 AM', '2:30 PM', '6:30 PM', '10:30 PM'], price: 250 },
    ],
    featured: true,
  },
  {
    id: 'movie4',
    title: 'Godzilla x Kong',
    poster: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/9Kr6UzouVteEHNFGCCRAfnKPKm2.jpg',
    description: 'The epic showdown that pits Godzilla and Kong together against a colossal undiscovered threat hidden within the world.',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    language: 'English',
    rating: 7.4,
    duration: '115 min',
    year: 2024,
    cast: [
      { name: 'Rebecca Hall', role: 'Ilene Andrews', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
      { name: 'Brian Tyree Henry', role: 'Bernie Hayes', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
      { name: 'Dan Stevens', role: 'Trapper', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['11:00 AM', '2:00 PM', '6:00 PM', '9:30 PM'], price: 280 },
      { date: '2024-03-16', times: ['11:30 AM', '2:30 PM', '6:30 PM', '10:00 PM'], price: 280 },
    ],
    featured: true,
  },
  {
    id: 'movie5',
    title: 'Civil War',
    poster: 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/ugS5FVNkOCDrzCZR5MJrgxH2FQh.jpg',
    description: 'A journey across a dystopian future America, following a team of military-embedded journalists as they race against time to reach DC before rebel factions descend on the White House.',
    genres: ['Action', 'Drama', 'War'],
    language: 'English',
    rating: 7.6,
    duration: '109 min',
    year: 2024,
    cast: [
      { name: 'Kirsten Dunst', role: 'Lee Smith', avatar: 'https://randomuser.me/api/portraits/women/48.jpg' },
      { name: 'Wagner Moura', role: 'Joel', avatar: 'https://randomuser.me/api/portraits/men/29.jpg' },
      { name: 'Cailee Spaeny', role: 'Jessie', avatar: 'https://randomuser.me/api/portraits/women/30.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['10:30 AM', '1:30 PM', '5:30 PM', '9:00 PM'], price: 240 },
      { date: '2024-03-16', times: ['11:00 AM', '2:00 PM', '6:00 PM', '9:30 PM'], price: 240 },
    ],
    featured: false,
  },
  {
    id: 'movie14',
    title: 'Master',
    poster: '/posters/master.png',
    backdrop: 'https://placehold.co/1200x600/1a1a35/e50914?text=Master',
    description: 'An alcoholic professor is sent to a juvenile detention center, where he clashes with a ruthless gangster who uses the children for his criminal activities.',
    genres: ['Action', 'Thriller'],
    language: 'Tamil',
    rating: 8.5,
    duration: '179 min',
    year: 2021,
    cast: [
      { name: 'Vijay', role: 'John Durairaj (JD)', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Vijay Sethupathi', role: 'Bhavani', avatar: 'https://randomuser.me/api/portraits/men/85.jpg' },
      { name: 'Malavika Mohanan', role: 'Charulatha', avatar: 'https://randomuser.me/api/portraits/women/88.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['11:00 AM', '3:00 PM', '7:00 PM'], price: 200 },
      { date: '2024-03-16', times: ['12:00 PM', '4:00 PM', '8:00 PM'], price: 200 },
    ],
    featured: false,
  },
  {
    id: 'movie7',
    title: 'Kingdom of the Planet of the Apes',
    poster: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg',
    description: 'Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he has been taught about the past.',
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    language: 'English',
    rating: 7.2,
    duration: '145 min',
    year: 2024,
    cast: [
      { name: 'Owen Teague', role: 'Noa', avatar: 'https://randomuser.me/api/portraits/men/25.jpg' },
      { name: 'Freya Allan', role: 'Mae', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
      { name: 'Kevin Durand', role: 'Proximus Caesar', avatar: 'https://randomuser.me/api/portraits/men/70.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['10:00 AM', '1:00 PM', '5:00 PM', '9:00 PM'], price: 260 },
      { date: '2024-03-16', times: ['10:30 AM', '1:30 PM', '5:30 PM', '9:30 PM'], price: 260 },
    ],
    featured: false,
  },
  {
    id: 'movie8',
    title: 'The Fall Guy',
    poster: 'https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqjHBxXZmrotuse.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/H5HjE7iqmBBxwKgALOsB6QbqJaF.jpg',
    description: 'A stuntman, fresh off an accident that ended his career, has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while revolutionizing stunt work.',
    genres: ['Action', 'Comedy', 'Romance'],
    language: 'English',
    rating: 7.5,
    duration: '126 min',
    year: 2024,
    cast: [
      { name: 'Ryan Gosling', role: 'Colt Seavers', avatar: 'https://randomuser.me/api/portraits/men/38.jpg' },
      { name: 'Emily Blunt', role: 'Jody Moreno', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' },
      { name: 'Aaron Taylor-Johnson', role: 'Tom Ryder', avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['11:30 AM', '2:30 PM', '6:30 PM', '10:00 PM'], price: 230 },
      { date: '2024-03-16', times: ['12:00 PM', '3:00 PM', '7:00 PM', '10:30 PM'], price: 230 },
    ],
    featured: false,
  },
  // --- MALAYALAM MOVIES ---
  // To use your own posters:
  // 1. Save image to public/posters/manjummel.jpg
  // 2. Change poster to: '/posters/manjummel.jpg'
  {
    id: 'movie9',
    title: 'Manjummel Boys',
    poster: '/posters/manjummel.png',
    backdrop: 'https://placehold.co/1200x600/1a1a35/e50914?text=Manjummel+Boys',
    description: 'A group of friends visiting Guna Cave in Kodaikanal to enjoy the trip, but their carefree trip turns into a frantic rescue mission after one of them gets trapped in a deep, dark pit. ',
    genres: ['Thriller', 'Adventure', 'Drama'],
    language: 'Malayalam',
    rating: 8.4,
    duration: '135 min',
    year: 2024,
    cast: [
      { name: 'Soubin Shahir', role: 'Siju David', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
      { name: 'Sreenath Bhasi', role: 'Subash', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { name: 'Balu Varghese', role: 'Sixen', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'], price: 200 },
      { date: '2024-03-16', times: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'], price: 200 },
    ],
    featured: true,
  },
  {
    id: 'movie10',
    title: 'Premalu',
    poster: '/posters/premalu.png',
    backdrop: 'https://placehold.co/1200x600/1a1a35/e50914?text=Premalu',
    description: 'Sachin pursues romance but finds himself caught between two potential partners, leading to amusing complications.',
    genres: ['Comedy', 'Romance'],
    language: 'Malayalam',
    rating: 9.3,
    duration: '156 min',
    year: 2024,
    cast: [
      { name: 'Naslen K. Gafoor', role: 'Sachin', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
      { name: 'Mamitha Baiju', role: 'Reenu', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
      { name: 'Sangeeth Prathap', role: 'Amal Davis', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['11:00 AM', '2:00 PM', '6:30 PM'], price: 180 },
      { date: '2024-03-16', times: ['12:00 PM', '4:00 PM', '8:00 PM'], price: 180 },
    ],
    featured: true,
  },
  {
    id: 'movie11',
    title: 'Aavesham',
    poster: '/posters/aavesham.png',
    backdrop: 'https://placehold.co/1200x600/1a1a35/e50914?text=Aavesham',
    description: 'Three college students living in a hostile environment seek help from an eccentric local gangster who behaves in the most unpredictable ways.',
    genres: ['Action', 'Comedy'],
    language: 'Malayalam',
    rating: 8.3,
    duration: '158 min',
    year: 2024,
    cast: [
      { name: 'Fahadh Faasil', role: 'Ranga', avatar: 'https://randomuser.me/api/portraits/men/77.jpg' },
      { name: 'Sajin Gopu', role: 'Amban', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
      { name: 'Mithun Jai Sankar', role: 'Bibi', avatar: 'https://randomuser.me/api/portraits/men/19.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['12:30 PM', '4:30 PM', '9:30 PM'], price: 250 },
      { date: '2024-03-16', times: ['1:00 PM', '5:00 PM', '10:00 PM'], price: 250 },
    ],
    featured: false,
  },
  {
    id: 'movie12',
    title: 'Bramayugam',
    poster: '/posters/bramayugam.png',
    backdrop: 'https://placehold.co/1200x600/1a1a35/e50914?text=Bramayugam',
    description: 'A folk horror tale set in the dark ages of Kerala about a singer who escapes slavery and finds himself stuck in a mysterious mansion.',
    genres: ['Horror', 'Thriller', 'Mystery'],
    language: 'Malayalam',
    rating: 8.5,
    duration: '139 min',
    year: 2024,
    cast: [
      { name: 'Mammootty', role: 'Kodumon Potti', avatar: 'https://randomuser.me/api/portraits/men/82.jpg' },
      { name: 'Arjun Ashokan', role: 'Thevan', avatar: 'https://randomuser.me/api/portraits/men/31.jpg' },
      { name: 'Sidharth Bharathan', role: 'Cook', avatar: 'https://randomuser.me/api/portraits/men/49.jpg' },
    ],
    shows: [
      { date: '2024-03-15', times: ['11:30 AM', '3:30 PM', '8:00 PM', '11:00 PM'], price: 220 },
      { date: '2024-03-16', times: ['12:30 PM', '4:30 PM', '9:00 PM', '11:45 PM'], price: 220 },
    ],
  },
];

import { deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';

export const seedMovies = async () => {
  try {
    const moviesRef = collection(db, 'movies');
    
    // 1. Delete movies from Firestore that are no longer in our local list
    const currentSnapshot = await getDocs(moviesRef);
    const localIds = movies.map(m => m.id);
    
    for (const docSnap of currentSnapshot.docs) {
      const movieData = docSnap.data();
      if (!localIds.includes(movieData.id)) {
        await deleteDoc(doc(db, 'movies', docSnap.id));
        console.log(`Deleted movie: ${movieData.title}`);
      }
    }

    // 2. Sync (Update/Add) local movies to Firestore
    for (const movie of movies) {
      // Find movie by our custom 'id' field
      const q = query(moviesRef, where('id', '==', movie.id));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        // Update existing movie
        const docId = snap.docs[0].id;
        await updateDoc(doc(db, 'movies', docId), movie);
      } else {
        // Add new movie
        await addDoc(moviesRef, movie);
      }
    }
    console.log('Movies synced successfully!');
  } catch (err) {
    console.error('Seed error:', err);
  }
};

export { movies as localMovies };
