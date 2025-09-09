import React from 'react'
import { Link } from 'react-router-dom'

type Tournament = {
  id: string
  name: string
  category: string
  dates: string
  location: string
  surface: string
  players: number
  status: 'upcoming' | 'active' | 'completed'
  description: string
}

const tournaments: Tournament[] = [
  {
    id: 'tokyo2025',
    name: 'Tokyo 2025',
    category: '500 Series',
    dates: 'September 24 - 30, 2025',
    location: 'Tokyo, Japan',
    surface: 'Hard',
    players: 32,
    status: 'active',
    description: ''
  },
  {
    id: 'beijing2025',
    name: 'Beijing 2025',
    category: '500 Series',
    dates: 'September 25 - October 1, 2025',
    location: 'Beijing, China',
    surface: 'Hard',
    players: 32,
    status: 'upcoming',
    description: ''
  }
]

const HomePage: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'upcoming': return 'bg-blue-500'
      case 'completed': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Live Now'
      case 'upcoming': return 'Coming Soon'
      case 'completed': return 'Completed'
      default: return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-purple p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Tennis Bracket
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Predict tournament outcomes and compete with friends.
            Make your picks for tennis tournaments around the world.
          </p>
        </div>

        {/* Tournament Selection */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-slate-300 text-lg">
            Select a tournament to make your predictions
          </p>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tournaments.map((tournament) => {
            const isComingSoon = tournament.status === 'upcoming'
            const CardContent = () => (
              <div className={`group block bg-brand-panel/90 backdrop-blur-sm rounded-xl border border-brand-border transition-all duration-300 overflow-hidden ${
                isComingSoon 
                  ? 'cursor-not-allowed opacity-75' 
                  : 'hover:border-brand-purple hover:shadow-lg hover:shadow-brand-purple/20'
              }`}>
              {/* Status Badge */}
              <div className="relative">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(tournament.status)}`}>
                  {getStatusText(tournament.status)}
                </div>
              </div>

              {/* Tournament Header */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-16 group-hover:text-brand-purple transition-colors">
                  {tournament.name}
                </h3>
              </div>

              {/* Tournament Info */}
              <div className="p-6 sm:p-8">
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-slate-300">
                    <span className="text-brand-purple mr-2">📍</span>
                    <span className="text-sm sm:text-base">{tournament.location}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <span className="text-brand-purple mr-2">📅</span>
                    <span className="text-sm sm:text-base">{tournament.dates}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <span className="text-brand-purple mr-2">🏆</span>
                    <span className="text-sm sm:text-base">{tournament.category}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <span className="text-brand-purple mr-2">🎾</span>
                    <span className="text-sm sm:text-base">{tournament.surface} • {tournament.players} players</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                  <div className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isComingSoon 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-brand-purple text-white group-hover:bg-brand-purple/80'
                  }`}>
                    {tournament.status === 'active' ? 'Make Predictions' : 
                     tournament.status === 'upcoming' ? 'Coming Soon' : 
                     'View Results'}
                  </div>
                </div>
              </div>
            </div>
            )

            return isComingSoon ? (
              <div key={tournament.id}>
                <CardContent />
              </div>
            ) : (
              <Link key={tournament.id} to={`/${tournament.id}`}>
                <CardContent />
              </Link>
            )
          })}
        </div>

        {/* How It Works */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-brand-panel/50 backdrop-blur-sm rounded-xl border border-brand-border p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-slate-300">
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-white mb-2">Make Predictions</h4>
                <p className="text-sm sm:text-base">Pick winners for each match in the tournament bracket</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-semibold text-white mb-2">Compete & Share</h4>
                <p className="text-sm sm:text-base">Share your bracket with friends and compare results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 sm:mt-20 pt-8 border-t border-brand-border">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-6">
              <Link 
                to="/imprint" 
                className="text-slate-300 hover:text-brand-purple transition-colors text-sm sm:text-base"
              >
                Imprint
              </Link>
              <Link 
                to="/privacy" 
                className="text-slate-300 hover:text-brand-purple transition-colors text-sm sm:text-base"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-slate-300 hover:text-brand-purple transition-colors text-sm sm:text-base"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              © 2025 Your Tennis Bracket. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomePage
