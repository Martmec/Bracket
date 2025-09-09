import React from 'react'
import { Link } from 'react-router-dom'

interface Tournament {
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
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-purple">
      {/* Header */}
      <div className="bg-brand-panel/90 backdrop-blur-sm border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your Tennis Bracket
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Predict tournament outcomes and compete with friends. 
              Make your picks for tennis tournaments around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Current Tournaments
          </h2>
          <p className="text-slate-300 text-lg">
            Select a tournament to make your predictions
          </p>
        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tournaments.map((tournament) => (
            <Link
              key={tournament.id}
              to={`/${tournament.id}`}
              className="group block bg-brand-panel/90 backdrop-blur-sm rounded-xl border border-brand-border hover:border-brand-purple transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/20 overflow-hidden"
            >
              {/* Status Badge */}
              <div className="relative">
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(tournament.status)}`}>
                  {getStatusText(tournament.status)}
                </div>
              </div>

              {/* Tournament Info */}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-16 group-hover:text-brand-purple transition-colors">
                  {tournament.name}
                </h3>
                
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
                  <div className="bg-brand-purple text-white px-6 py-3 rounded-lg font-semibold group-hover:bg-brand-purple/80 transition-colors">
                    {tournament.status === 'active' ? 'Make Predictions' : 
                     tournament.status === 'upcoming' ? 'View Tournament' : 
                     'View Results'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
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
      </div>
    </div>
  )
}

export default HomePage
