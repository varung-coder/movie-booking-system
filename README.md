# 🎬 CineBook - Premium Movie Booking Experience

CineBook is a state-of-the-art, full-stack movie booking application featuring a sleek, premium design. Built with React and powered by Firebase, it offers a seamless experience from browsing the latest hits to selecting your favorite seats.

## Live Deployment 
https://movie-booking-system-7j53sq3pd-g-varuns-projects.vercel.app/

## ✨ Features

- **Premium UI/UX**: Modern dark-themed design with vibrant gradients, glassmorphism, and smooth micro-animations.
- **Dynamic Movie Grid**: Browse an extensive collection of Malayalam, Tamil, and English movies with real-time ratings and tags.
- **Detailed Movie Insights**: View detailed descriptions, cast information, and posters for every film.
- **Interactive Seat Selection**: Choose your preferred seats through a visual theatre layout with real-time availability.
- **Secure Authentication**: Integrated Firebase Authentication supporting Google Sign-In and email/password accounts.
- **Personalized Bookings**: Dedicated "My Bookings" page to track all your movie reservations.
- **Smart Data Sync**: Automated Firestore seeding logic that syncs local movie data with the database, including automatic cleanup of removed titles.

## 🚀 Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Backend/Database**: [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth)
- **Navigation**: React Router DOM (v7)
- **UI Components**: Swiper (for interactive carousels), React Icons, React Hot Toast (for smooth notifications)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/varung-coder/movie-booking-system.git
   cd movie-booking-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   - Create a project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Cloud Firestore** and **Authentication** (Google + Email/Password).
   - Create a `.env` file in the root directory (or update `src/firebase/config.js`) with your project's Firebase credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🎥 Currently Showing

CineBook features the latest blockbusters with high-quality posters:
- **Premalu**
- **Aavesham**
- **Manjummel Boys**
- **Bramayugam**
- **Leo**
- **Master**
- *and many more...*

## 📄 License

This project is for educational purposes. All movie assets belong to their respective creators.

---
Built with ❤️ by [G Varun](https://github.com/varung-coder)
