import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Share2, RotateCcw, Download, ArrowLeft } from 'lucide-react'
import jsPDF from 'jspdf'

type Player = {
  id: number
  name: string
  flag: string
  seed: number | null
  position: number
}

type Match = {
  id: string
  player1: Player | null
  player2: Player | null
  round: number
  matchNumber?: number
  dependsOn?: string[]
  status?: 'upcoming' | 'completed'
  fixedResult?: 'player1' | 'player2'
}

// Fixed results for already played matches
// These can be manually updated daily
const fixedResults: Record<string, 'player1' | 'player2'> = {
  // Round 1 - completed matches
  'r1-m1': 'player1', // Jannik Sinner wins against Mackenzie McDonald
  'r1-m3': 'player2', // Tommy Paul wins against Mariano Navone
  // Other matches are still upcoming and can be tipped
  // Add more fixed results here as matches are completed
  // Format: 'r{round}-m{match}': 'player1' or 'player2'
}

const getFlagEmoji = (country: string): string => {
  const flags: Record<string, string> = {
    'ITA': '🇮🇹', 'USA': '🇺🇸', 'AUS': '🇦🇺', 'ESP': '🇪🇸', 'ARG': '🇦🇷', 'CAN': '🇨🇦',
    'BUL': '🇧🇬', 'POL': '🇵🇱', 'KAZ': '🇰🇿', 'GBR': '🇬🇧', 'FRA': '🇫🇷', 'RUS': '🇷🇺',
    'NED': '🇳🇱', 'CHN': '🇨🇳', 'CZE': '🇨🇿', 'GER': '🇩🇪', 'JPN': '🇯🇵', 'DEN': '🇩🇰',
    'SRB': '🇷🇸', 'CRO': '🇭🇷', 'HUN': '🇭🇺', 'GRE': '🇬🇷', 'COL': '🇨🇴', 'POR': '🇵🇹',
    'FIN': '🇫🇮', 'UKR': '🇺🇦', 'ISR': '🇮🇱', 'PHI': '🇵🇭', 'MAD': '🇲🇬', 'MEX': '🇲🇽',
    'TUR': '🇹🇷', 'SVK': '🇸🇰', 'BRA': '🇧🇷'
  }
  return flags[country] || '🏳️'
}

const generatePlayers = (tournamentId?: string): Player[] => {
  if (tournamentId === 'saopaulo2025') {
    // WTA São Paulo 2025 - 32 players, 8 seeded
    const saoPauloDraw = [
      { pos: 1, name: 'Beatriz Haddad Maia', country: 'BRA', seed: 1 },
      { pos: 2, name: 'Miriana Tona', country: 'ITA', seed: null, qualifier: true },
      { pos: 3, name: 'Elizabeth Mandlik', country: 'USA', seed: null },
      { pos: 4, name: 'Laura Pigossi', country: 'BRA', seed: null },
      { pos: 5, name: 'Jazmin Ortenzi', country: 'ARG', seed: null },
      { pos: 6, name: 'Berfu Cengiz', country: 'TUR', seed: null },
      { pos: 7, name: 'Luiza Fullana', country: 'BRA', seed: null, wildcard: true },
      { pos: 8, name: 'Renata Zarazúa', country: 'MEX', seed: 5 },
      { pos: 9, name: 'Ajla Tomljanović', country: 'AUS', seed: 4 },
      { pos: 10, name: 'Victoria Rodríguez', country: 'MEX', seed: null, qualifier: true },
      { pos: 11, name: 'Ana Sofía Sánchez', country: 'MEX', seed: null },
      { pos: 12, name: 'Tiantsoa Rakotomanga Rajaonah', country: 'MAD', seed: null },
      { pos: 13, name: 'Valeriya Strakhova', country: 'UKR', seed: null },
      { pos: 14, name: 'Ana Candiotto', country: 'BRA', seed: null, wildcard: true },
      { pos: 15, name: 'Anna Rogers', country: 'USA', seed: null },
      { pos: 16, name: 'Panna Udvardy', country: 'HUN', seed: 8 },
      { pos: 17, name: 'Léolia Jeanjean', country: 'FRA', seed: 7 },
      { pos: 18, name: 'Janice Tjen', country: 'USA', seed: null },
      { pos: 19, name: 'Arina Rodionova', country: 'AUS', seed: null },
      { pos: 20, name: 'Martina Okáľová', country: 'SVK', seed: null, qualifier: true },
      { pos: 21, name: 'Julia Riera', country: 'ARG', seed: null },
      { pos: 22, name: 'Vitalia Diatchenko', country: 'RUS', seed: null },
      { pos: 23, name: 'Yasmine Mansouri', country: 'FRA', seed: null, qualifier: true },
      { pos: 24, name: 'Alexandra Eala', country: 'PHI', seed: 3 },
      { pos: 25, name: 'Francesca Jones', country: 'GBR', seed: 6 },
      { pos: 26, name: 'Lina Glushko', country: 'ISR', seed: null },
      { pos: 27, name: 'Victoria Luiza Barros', country: 'BRA', seed: null, wildcard: true },
      { pos: 28, name: 'Whitney Osuigwe', country: 'USA', seed: null },
      { pos: 29, name: 'Carolina Alves', country: 'BRA', seed: null },
      { pos: 30, name: 'Nauhany Vitoria Leme Da Silva', country: 'BRA', seed: null, wildcard: true },
      { pos: 31, name: 'Arianne Hartono', country: 'NED', seed: null },
      { pos: 32, name: 'Solana Sierra', country: 'ARG', seed: 2 }
    ]

    return saoPauloDraw.map((player, index) => ({
      id: index + 1,
      name: player.name,
      flag: getFlagEmoji(player.country),
      seed: player.seed && player.seed <= 8 ? player.seed : null,
      position: player.pos
    }))
  }

  // Default Tokyo 2025 draw - 32 players, 8 seeded
  const tokyoDraw = [
    { pos: 1, name: 'Jannik Sinner', country: 'ITA', seed: 1 },
    { pos: 2, name: 'Mackenzie McDonald', country: 'USA', seed: null },
    { pos: 3, name: "Christopher O'Connell", country: 'AUS', seed: null },
    { pos: 4, name: 'Roberto Carballes Baena', country: 'ESP', seed: null },
    { pos: 5, name: 'Mariano Navone', country: 'ARG', seed: null },
    { pos: 6, name: 'Tommy Paul', country: 'USA', seed: 8 },
    { pos: 7, name: 'Gabriel Diallo', country: 'CAN', seed: null },
    { pos: 8, name: 'Alex de Minaur', country: 'AUS', seed: 5 },
    { pos: 9, name: 'Taylor Fritz', country: 'USA', seed: 6 },
    { pos: 10, name: 'Matteo Berrettini', country: 'ITA', seed: null },
    { pos: 11, name: 'Francisco Comesana', country: 'ARG', seed: null },
    { pos: 12, name: 'Brandon Nakashima', country: 'USA', seed: null },
    { pos: 13, name: 'Alejandro Davidovich Fokina', country: 'ESP', seed: null },
    { pos: 14, name: 'Lorenzo Musetti', country: 'ITA', seed: null },
    { pos: 15, name: 'Reilly Opelka', country: 'USA', seed: null },
    { pos: 16, name: 'Grigor Dimitrov', country: 'BUL', seed: 4 },
    { pos: 17, name: 'Hubert Hurkacz', country: 'POL', seed: 3 },
    { pos: 18, name: 'Timofey Skatov', country: 'KAZ', seed: null },
    { pos: 19, name: 'Jordan Thompson', country: 'AUS', seed: null },
    { pos: 20, name: 'Flavio Cobolli', country: 'ITA', seed: null },
    { pos: 21, name: 'Cameron Norrie', country: 'GBR', seed: null },
    { pos: 22, name: 'Arthur Fils', country: 'FRA', seed: null },
    { pos: 23, name: 'Pavel Kotov', country: 'RUS', seed: null },
    { pos: 24, name: 'Ben Shelton', country: 'USA', seed: 7 },
    { pos: 25, name: 'Frances Tiafoe', country: 'USA', seed: null },
    { pos: 26, name: 'Learner Tien', country: 'USA', seed: null },
    { pos: 27, name: 'Botic van de Zandschulp', country: 'NED', seed: null },
    { pos: 28, name: 'Sebastian Baez', country: 'ARG', seed: null },
    { pos: 29, name: 'Lorenzo Sonego', country: 'ITA', seed: null },
    { pos: 30, name: 'Roman Safiullin', country: 'RUS', seed: null },
    { pos: 31, name: 'Pedro Martinez', country: 'ESP', seed: null },
    { pos: 32, name: 'Alexei Popyrin', country: 'AUS', seed: 2 }
  ]

  return tokyoDraw.map((player, index) => ({
    id: index + 1,
    name: player.name,
    flag: getFlagEmoji(player.country),
    seed: player.seed && player.seed <= 8 ? player.seed : null,
    position: player.pos
  }))
}

// Tournament configurations
const tournamentConfigs = {
  tokyo2025: {
    name: 'Tokyo 2025',
    location: 'Tokyo, Japan',
    surface: 'Hard',
    category: '500 Series',
    dates: 'September 24 - 30, 2025',
    slug: 'tokyo-2025'
  },
  saopaulo2025: {
    name: 'São Paulo 2025',
    location: 'São Paulo, Brazil',
    surface: 'Clay',
    category: '250 Series',
    dates: 'January 20 - 26, 2025',
    slug: 'sao-paulo-2025'
  },
  beijing2025: {
    name: 'Beijing 2025',
    location: 'Beijing, China',
    surface: 'Hard',
    category: '500 Series',
    dates: 'September 25 - October 1, 2025',
    slug: 'beijing-2025'
  }
}

const TournamentPage: React.FC = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>()
  const [players] = useState<Player[]>(generatePlayers(tournamentId))
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [predictions, setPredictions] = useState<Record<string, 'player1' | 'player2'>>({})

  const tournamentConfig = tournamentConfigs[tournamentId as keyof typeof tournamentConfigs] || tournamentConfigs.tokyo2025

  const rounds = [
    { id: 1, name: 'R32', matches: 16, players: 32 },
    { id: 2, name: 'R16', matches: 8, players: 16 },
    { id: 3, name: 'QF', matches: 4, players: 8 },
    { id: 4, name: 'SF', matches: 2, players: 4 },
    { id: 5, name: 'F', matches: 1, players: 2 }
  ]
  const totalRounds = rounds.length

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const predictionsData = urlParams.get('predictions')
    if (predictionsData) {
      try {
        const decoded = JSON.parse(atob(predictionsData))
        setPredictions(decoded)
      } catch (e) {
        console.error('Failed to load predictions from URL')
      }
    }
  }, [])

  const generateMatches = (round: number): Match[] => {
    const matches: Match[] = []
    const roundInfo = rounds[round - 1]
    const matchesInRound = roundInfo.matches

    for (let i = 0; i < matchesInRound; i++) {
      const matchId = `r${round}-m${i + 1}`
      const isCompleted = fixedResults[matchId] !== undefined
      
      let player1: Player | null = null
      let player2: Player | null = null

      if (round === 1) {
        // First round - use direct player positions
        const pos1 = i * 2 + 1
        const pos2 = i * 2 + 2
        player1 = players.find(p => p.position === pos1) || null
        player2 = players.find(p => p.position === pos2) || null
      } else {
        // Later rounds - use winners from previous round
        const prevRound = round - 1
        const prevMatch1 = `r${prevRound}-m${i * 2 + 1}`
        const prevMatch2 = `r${prevRound}-m${i * 2 + 2}`
        
        player1 = getMatchWinner(prevMatch1, prevRound)
        player2 = getMatchWinner(prevMatch2, prevRound)
      }

      matches.push({
        id: matchId,
        player1,
        player2,
        round,
        matchNumber: i + 1,
        status: isCompleted ? 'completed' : 'upcoming',
        fixedResult: fixedResults[matchId]
      })
    }

    return matches
  }

  const getMatchWinner = (matchId: string, round: number): Player | null => {
    const match = generateMatches(round).find(m => m.id === matchId)
    if (!match) return null

    // Check if there's a fixed result first
    if (fixedResults[matchId]) {
      return fixedResults[matchId] === 'player1' ? match.player1 : match.player2
    }

    // Check user predictions
    const prediction = predictions[matchId]
    if (prediction && match.player1 && match.player2) {
      return prediction === 'player1' ? match.player1 : match.player2
    }

    return null
  }

  const handlePrediction = (matchId: string, winner: 'player1' | 'player2') => {
    // Don't allow changes to fixed results
    if (fixedResults[matchId]) {
      return
    }

    setPredictions(prev => ({
      ...prev,
      [matchId]: winner
    }))
  }

  const currentRoundMatches = generateMatches(currentRound)

  const isComplete = (round: number) => {
    const roundMatches = generateMatches(round)
    return roundMatches.every((m) => (fixedResults[m.id] || predictions[m.id]) && m.player1 && m.player2)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    const margin = 20
    let yPosition = 20

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text(tournamentConfig.name, margin, yPosition)
    yPosition += 10

    // Tournament details
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`${tournamentConfig.location} • ${tournamentConfig.surface} • ${tournamentConfig.dates}`, margin, yPosition)
    yPosition += 15

    // Tournament Bracket
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Tournament Bracket', margin, yPosition)
    yPosition += 10

    // Add matches for all rounds
    rounds.forEach((round) => {
      const roundMatches = generateMatches(round.id)
      
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      const roundName = round.name === 'R32' ? 'Round of 32' :
                       round.name === 'R16' ? 'Round of 16' :
                       round.name === 'QF' ? 'Quarterfinals' :
                       round.name === 'SF' ? 'Semifinals' :
                       round.name === 'F' ? 'Final' : `Round of ${round.players}`
      doc.text(roundName, margin, yPosition)
      yPosition += 8

      roundMatches.forEach((match) => {
        if (match.player1 && match.player2) {
          const isFixed = fixedResults[match.id] !== undefined
          const winner = getMatchWinner(match.id, round.id)
          
          let matchText = ''
          if (winner) {
            // Bold and underline the winner
            matchText = `${winner.name} wins vs. ${match.player1.id === winner.id ? match.player2.name : match.player1.name}`
            if (isFixed) {
              matchText += ' (Already completed)'
            }
          } else {
            matchText = `${match.player1.name} vs. ${match.player2.name}`
          }

          doc.setFontSize(10)
          doc.setFont('helvetica', winner ? 'bold' : 'normal')
          doc.text(matchText, margin + 10, yPosition)
          yPosition += 6

          if (yPosition > 280) {
            doc.addPage()
            yPosition = 20
          }
        }
      })
      yPosition += 5
    })

    doc.save(`${tournamentConfig.slug}-bracket.pdf`)
  }

  const shareResults = async () => {
    try {
      const predictionsData = btoa(JSON.stringify(predictions))
      const longUrl = `${window.location.origin}/${tournamentId}?predictions=${predictionsData}`
      
      await navigator.clipboard.writeText(longUrl)
      alert('Bracket URL copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      alert('Failed to copy URL. Please try again.')
    }
  }

  const resetBracket = () => {
    setPredictions({})
    setCurrentRound(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-purple p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-brand-panel/90 backdrop-blur-sm rounded-xl border border-brand-border p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-brand-purple hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tournaments
              </Link>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {tournamentConfig.name}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                {tournamentConfig.location} • {tournamentConfig.surface} • {tournamentConfig.dates}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-0">
              <button
                onClick={exportToPDF}
                className="flex items-center px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/80 transition-colors text-sm sm:text-base"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              <button
                onClick={shareResults}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={resetBracket}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Round Navigation */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {rounds.map((round) => (
              <button
                key={round.id}
                onClick={() => setCurrentRound(round.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  currentRound === round.id
                    ? 'bg-brand-purple text-white'
                    : isComplete(round.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {round.name === 'R32' ? 'R32' :
                 round.name === 'R16' ? 'R16' :
                 round.name === 'QF' ? 'QF' :
                 round.name === 'SF' ? 'SF' :
                 round.name === 'F' ? 'F' : round.name}
                {isComplete(round.id) && <span className="ml-1">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Current Round */}
        <div className="bg-brand-panel/50 backdrop-blur-sm rounded-xl border border-brand-border p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 px-4">
            {currentRound <= totalRounds ?
              (() => {
                const round = rounds[currentRound - 1]
                switch (round.name) {
                  case 'R32': return 'Round of 32'
                  case 'R16': return 'Round of 16'
                  case 'QF': return 'Quarterfinals'
                  case 'SF': return 'Semifinals'
                  case 'F': return 'Final'
                  default: return `Round of ${round.players}`
                }
              })() :
              'Tournament Complete'
            }
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {currentRoundMatches.map((match) => {
              const isCompleted = match.status === 'completed'
              const isDisabled = isCompleted

              return (
                <div key={match.id} className="bg-brand-panel/30 backdrop-blur-sm rounded-lg border border-brand-border p-4 sm:p-6">
                  {isCompleted && (
                    <div className="text-center mb-3">
                      <span className="text-green-400 font-semibold text-sm">✓ COMPLETED</span>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {match.player1 && (
                      <button
                        onClick={() => handlePrediction(match.id, 'player1')}
                        disabled={isDisabled}
                        className={`flex-1 p-4 sm:p-6 rounded-lg border-2 transition-all ${
                          isDisabled
                            ? 'bg-gray-600/30 border-gray-500 cursor-not-allowed opacity-75'
                            : predictions[match.id] === 'player1'
                            ? 'bg-green-600/20 border-green-500 text-green-300'
                            : 'bg-brand-panel/50 border-brand-border hover:border-brand-purple hover:bg-brand-panel/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl sm:text-3xl">{match.player1.flag}</span>
                            <div>
                              <div className="font-semibold text-white text-base sm:text-lg">
                                {match.player1.name}
                                {isCompleted && match.fixedResult === 'player1' && (
                                  <span className="ml-2 text-green-400">✓ COMPLETED</span>
                                )}
                              </div>
                              {match.player1.seed && (
                                <div className="text-brand-purple text-sm sm:text-base font-medium">
                                  #{match.player1.seed}
                                </div>
                              )}
                            </div>
                          </div>
                          {predictions[match.id] === 'player1' && !isCompleted && (
                            <span className="text-green-400 text-xl sm:text-2xl">✓</span>
                          )}
                        </div>
                      </button>
                    )}

                    <div className="flex items-center justify-center text-slate-400 text-sm sm:text-base font-medium">
                      vs
                    </div>

                    {match.player2 && (
                      <button
                        onClick={() => handlePrediction(match.id, 'player2')}
                        disabled={isDisabled}
                        className={`flex-1 p-4 sm:p-6 rounded-lg border-2 transition-all ${
                          isDisabled
                            ? 'bg-gray-600/30 border-gray-500 cursor-not-allowed opacity-75'
                            : predictions[match.id] === 'player2'
                            ? 'bg-green-600/20 border-green-500 text-green-300'
                            : 'bg-brand-panel/50 border-brand-border hover:border-brand-purple hover:bg-brand-panel/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl sm:text-3xl">{match.player2.flag}</span>
                            <div>
                              <div className="font-semibold text-white text-base sm:text-lg">
                                {match.player2.name}
                                {isCompleted && match.fixedResult === 'player2' && (
                                  <span className="ml-2 text-green-400">✓ COMPLETED</span>
                                )}
                              </div>
                              {match.player2.seed && (
                                <div className="text-brand-purple text-sm sm:text-base font-medium">
                                  #{match.player2.seed}
                                </div>
                              )}
                            </div>
                          </div>
                          {predictions[match.id] === 'player2' && !isCompleted && (
                            <span className="text-green-400 text-xl sm:text-2xl">✓</span>
                          )}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentPage