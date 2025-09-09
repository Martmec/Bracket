import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import TournamentPage from './components/TournamentPage'

function App() {
  return (
    <Router>
      <main style={{ fontFamily: 'system-ui, sans-serif' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:tournamentId" element={<TournamentPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
