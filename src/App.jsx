import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import SeatSelectionPage from './pages/SeatSelectionPage'
import MyBookingsPage from './pages/MyBookingsPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/movies/:id/seats" element={<SeatSelectionPage />} />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <footer className="bg-dark-800 border-t border-white/5 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gradient font-bold text-xl mb-2">🎬 CineBook</p>
          <p className="text-white/40 text-sm">© 2024 CineBook. Your premier movie ticket booking experience.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
