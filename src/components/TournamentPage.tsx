import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Share2, Trophy, Users, RotateCcw, Download, ArrowLeft } from 'lucide-react'
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
  // No completed matches - all games can be tipped
  // Add fixed results here as matches are completed
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

// Tournament configurations
const tournamentConfigs = {
  tokyo2025: {
    name: 'Tokyo 2025 (ATP)',
    location: 'Tokyo, Japan',
    surface: 'Hard',
    category: '500 Series',
    dates: 'September 24 - 30, 2025',
    slug: 'tokyo-2025'
  },
  saopaulo2025: {
    name: 'São Paulo 2025 (WTA)',
    location: 'São Paulo, Brazil',
    surface: 'Hard',
    category: '250 Series',
    dates: 'September 8 - 14, 2025',
    slug: 'sao-paulo-2025'
  },
  beijing2025: {
    name: 'Beijing 2025 (ATP)',
    location: 'Beijing, China',
    surface: 'Hard',
    category: '500 Series',
    dates: 'September 25 - October 1, 2025',
    slug: 'beijing-2025'
  }
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

const TournamentPage: React.FC = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>()
  const [players] = useState<Player[]>(generatePlayers(tournamentId))
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [predictions, setPredictions] = useState<Record<string, 'player1' | 'player2' | undefined>>({})
  
  const [champion, setChampion] = useState<Player | null>(null)

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

  useEffect(() => {
    const finalMatch = predictions[`r${totalRounds}-m1`]
    if (finalMatch) {
      const finalMatches = generateMatches(totalRounds)
      if (finalMatches.length > 0) {
        const match = finalMatches[0]
        const winner = finalMatch === 'player1' ? match.player1 : match.player2
        setChampion(winner || null)
      }
    } else {
      setChampion(null)
    }
  }, [predictions])

  const getMatchWinner = (matchId: string, match: Match | undefined): Player | null => {
    if (!match) return null
    
    // Check if match has a fixed result first
    if (fixedResults[matchId]) {
      return fixedResults[matchId] === 'player1' ? match.player1 : match.player2
    }
    
    // Otherwise check predictions
    if (!predictions[matchId]) return null
    return predictions[matchId] === 'player1' ? match.player1 : match.player2
  }

  const generateMatches = (roundId: number): Match[] => {
    if (roundId === 1) {
      const matches: Match[] = []
      const firstRoundMatches = Math.floor(players.length / 2)
      for (let i = 0; i < firstRoundMatches; i++) {
        const player1 = players[i * 2]
        const player2 = players[i * 2 + 1]
        const matchId = `r1-m${i + 1}`
        const match: Match = {
          id: matchId,
          player1,
          player2,
          round: 1,
          matchNumber: i + 1
        }
        
        // Check if match is already completed
        if (fixedResults[matchId]) {
          match.status = 'completed'
          match.fixedResult = fixedResults[matchId]
        } else {
          match.status = 'upcoming'
        }
        
        matches.push(match)
      }
      return matches
    }

    const prevRoundMatches = generateMatches(roundId - 1)
    const matches: Match[] = []
    const matchCount = Math.pow(2, totalRounds - roundId)

    for (let i = 0; i < matchCount; i++) {
      const match1Id = `r${roundId - 1}-m${i * 2 + 1}`
      const match2Id = `r${roundId - 1}-m${i * 2 + 2}`
      const winner1 = getMatchWinner(match1Id, prevRoundMatches[i * 2])
      const winner2 = getMatchWinner(match2Id, prevRoundMatches[i * 2 + 1])
      const matchId = `r${roundId}-m${i + 1}`
      const match: Match = {
        id: matchId,
        player1: winner1,
        player2: winner2,
        round: roundId,
        dependsOn: [match1Id, match2Id],
        matchNumber: i + 1
      }
      
      // Check if match is already completed
      if (fixedResults[matchId]) {
        match.status = 'completed'
        match.fixedResult = fixedResults[matchId]
      } else {
        match.status = 'upcoming'
      }
      
      matches.push(match)
    }
    return matches
  }

  const currentMatches = generateMatches(currentRound)

  const handlePrediction = (matchId: string, winner: 'player1' | 'player2') => {
    // Check if match is already completed
    if (fixedResults[matchId]) {
      return // No changes allowed for completed matches
    }
    
    setPredictions((prev) => ({
      ...prev,
      [matchId]: winner
    }))
  }


  const getTotalPredictions = () => {
    return Object.keys(predictions).length
  }

  const clearAllPredictions = () => {
    if (confirm('Clear all predictions? This action cannot be undone.')) {
      setPredictions({})
      setChampion(null)
    }
  }


  const shareResults = async () => {
    const data = btoa(JSON.stringify(predictions))
    const currentDomain = window.location.origin
    const longUrl = `${currentDomain}/${tournamentId}?predictions=${data}`
    
    // Copy the URL directly to clipboard (no short URL due to CORS issues)
    try {
      await navigator.clipboard.writeText(longUrl)
      alert('Share link copied to clipboard!')
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = longUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Share link copied to clipboard!')
    }
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Header
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text(tournamentConfig.name, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`${tournamentConfig.category} • ${tournamentConfig.dates}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 20

    // Tournament Bracket
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Tournament Bracket', 20, yPosition)
    yPosition += 15

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    
    for (let round = 1; round <= totalRounds; round++) {
      if (yPosition > pageHeight - 30) {
        doc.addPage()
        yPosition = 20
      }

      const roundMatches = generateMatches(round)
      const roundName = rounds[round - 1]?.name || `Round ${round}`
      
      doc.setFont('helvetica', 'bold')
      doc.text(roundName, 20, yPosition)
      yPosition += 10

      doc.setFont('helvetica', 'normal')
      roundMatches.forEach((match) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage()
          yPosition = 20
        }

        const player1Name = match.player1?.name || 'TBD'
        const player2Name = match.player2?.name || 'TBD'
        const prediction = predictions[match.id]
        const fixedResult = fixedResults[match.id]
        const isCompleted = match.status === 'completed'
        
        // Check if we have either a prediction or fixed result
        const result = fixedResult || prediction
        
        if (result) {
          const winner = result === 'player1' ? player1Name : player2Name
          const loser = result === 'player1' ? player2Name : player1Name
          
          // Winner underlined
          doc.setFont('helvetica', 'bold')
          doc.text(winner, 30, yPosition)
          const winnerWidth = doc.getTextWidth(winner)
          
          // " wins vs. "
          doc.setFont('helvetica', 'normal')
          doc.text(' wins vs. ', 30 + winnerWidth, yPosition)
          const winsTextWidth = doc.getTextWidth(' wins vs. ')
          
          // Loser
          doc.text(loser, 30 + winnerWidth + winsTextWidth, yPosition)
          
          // Add "(Already completed)" for fixed results
          if (isCompleted) {
            const loserWidth = doc.getTextWidth(loser)
            doc.setFont('helvetica', 'italic')
            doc.text(' (Already completed)', 30 + winnerWidth + winsTextWidth + loserWidth, yPosition)
          }
          
          // Underline the winner
          doc.line(30, yPosition + 1, 30 + winnerWidth, yPosition + 1)
        } else {
          // No prediction made
          doc.text(`${player1Name} vs ${player2Name}`, 30, yPosition)
        }
        
        yPosition += 8
      })
      yPosition += 8
    }

    // Save PDF
    const fileName = `${tournamentConfig.name.replace(/\s+/g, '_')}_Predictions.pdf`
    doc.save(fileName)
  }

  const getCompletionStats = () => {
    let totalMatches = 0
    let completedMatches = 0
    for (let i = 1; i <= totalRounds; i++) {
      const roundMatches = generateMatches(i)
      totalMatches += roundMatches.length
      completedMatches += roundMatches.filter((match) => predictions[match.id]).length
    }
    return { total: totalMatches, completed: completedMatches }
  }

  const stats = getCompletionStats()

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy2 to-brand-purple p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {champion && (
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple2 rounded-lg shadow-lg p-4 sm:p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-white" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">{tournamentConfig.name} Champion</h2>
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{champion.flag}</span>
              <span className="text-lg sm:text-xl font-semibold text-white">{champion.name}</span>
              {champion.seed && (
                <span className="bg-white text-brand-purple px-2 py-1 rounded font-bold text-sm">Seed {champion.seed}</span>
              )}
            </div>
          </div>
        )}

        {/* Highlighted header + round navigation module */}
        <div className="rounded-xl overflow-hidden shadow-2xl mb-4 sm:mb-6 border border-brand-border">
          {/* Gradient header bar */}
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple2 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <Link 
                  to="/" 
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tournaments
                </Link>
                <h1 className="text-xl sm:text-2xl font-bold text-white">{tournamentConfig.name}</h1>
                <p className="text-sm text-white/80">{tournamentConfig.category} • {tournamentConfig.surface}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={exportToPDF} className="flex items-center gap-2 bg-brand-green text-white px-4 py-3 rounded-lg hover:bg-brand-green/80 transition-colors text-sm">
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button onClick={clearAllPredictions} disabled={getTotalPredictions() === 0} className="flex items-center gap-2 bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button onClick={shareResults} disabled={getTotalPredictions() === 0} className="flex items-center gap-2 bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
          {/* Navigation body */}
          <div className="bg-brand-panel/90 backdrop-blur-sm p-4 sm:p-6 border-t border-brand-border">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {rounds.map((round) => {
                const roundMatches = generateMatches(round.id)
                const isComplete = roundMatches.every((m) => {
                  // Check if match is completed (either fixed result or user prediction)
                  const hasFixedResult = fixedResults[m.id]
                  const hasUserPrediction = predictions[m.id]
                  const isMatchComplete = hasFixedResult || hasUserPrediction
                  
                  // Also check that both players exist
                  const hasBothPlayers = m.player1 && m.player2
                  
                  return isMatchComplete && hasBothPlayers
                })
                const isActive = currentRound === round.id
                return (
                  <button
                    key={round.id}
                    onClick={() => setCurrentRound(round.id)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center font-semibold text-xs sm:text-sm transition-all
                      ${isActive ? 'border-brand-purple bg-brand-purple/20 text-white' : isComplete ? 'border-brand-green bg-brand-green/20 text-brand-green' : 'border-brand-border text-slate-300 hover:border-brand-purple hover:text-white'}`}
                  >
                    {round.name}
                    {isComplete && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-green rounded-full text-white text-xs flex items-center justify-center">✓</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="bg-brand-panel/90 backdrop-blur-sm rounded-lg shadow-sm p-6 mb-4 sm:mb-6 border border-brand-border text-center">
          <div className="text-brand-cream/60 text-sm">
            Advertisement Space
          </div>
        </div>

        <div className="flex gap-6 sm:gap-8">
          <div className="flex-1">
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
              {currentMatches.map((match, index) => {
                return (
                  <div key={match.id} className="relative">
                    <div className="bg-brand-panel border border-brand-border rounded-lg overflow-hidden">
                      <div className="px-3 py-1 bg-brand-border border-b border-brand-border">
                        <span className="text-slate-400 text-xs">Game {match.matchNumber || index + 1}</span>
                      </div>
                      <div>
                        {(() => {
                          const isCompleted = match.status === 'completed'
                          const isDisabled = isCompleted || !match.player1 || !match.player2
                          const winner = isCompleted ? match.fixedResult : predictions[match.id]
                          return (
                            <button 
                              onClick={() => !isDisabled && handlePrediction(match.id, 'player1')} 
                              disabled={isDisabled} 
                              className={`w-full p-2 sm:p-3 text-left transition-all border-b border-brand-border ${
                                isCompleted 
                                  ? 'bg-gray-600/30 border-gray-500 cursor-not-allowed opacity-75' 
                                  : winner === 'player1' 
                                    ? 'bg-brand-green/20 border-brand-green' 
                                    : match.player1 
                                      ? 'hover:bg-brand-border/50' 
                                      : 'cursor-not-allowed opacity-50'
                              }`}
                            >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              {match.player1?.seed && (
                                <span className="text-xs bg-brand-border text-slate-200 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded flex-shrink-0">{match.player1.seed}</span>
                              )}
                              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                                <span className="text-white text-sm sm:text-base truncate">{match.player1?.name || 'TBD'}</span>
                                {match.player1?.flag && <span className="text-base sm:text-lg flex-shrink-0">{match.player1.flag}</span>}
                              </div>
                            </div>
                            {winner === 'player1' && (
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-brand-green text-lg">✓</span>
                                {isCompleted && (
                                  <span className="text-xs text-gray-400 font-semibold">COMPLETED</span>
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                        )
                        })()}
                        {(() => {
                          const isCompleted = match.status === 'completed'
                          const isDisabled = isCompleted || !match.player1 || !match.player2
                          const winner = isCompleted ? match.fixedResult : predictions[match.id]
                          return (
                            <button 
                              onClick={() => !isDisabled && handlePrediction(match.id, 'player2')} 
                              disabled={isDisabled} 
                              className={`w-full p-2 sm:p-3 text-left transition-all ${
                                isCompleted 
                                  ? 'bg-gray-600/30 border-gray-500 cursor-not-allowed opacity-75' 
                                  : winner === 'player2' 
                                    ? 'bg-brand-green/20 border-brand-green' 
                                    : match.player2 
                                      ? 'hover:bg-brand-border/50' 
                                      : 'cursor-not-allowed opacity-50'
                              }`}
                            >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              {match.player2?.seed && (
                                <span className="text-xs bg-brand-border text-slate-200 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded flex-shrink-0">{match.player2.seed}</span>
                              )}
                              <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                                <span className="text-white text-sm sm:text-base truncate">{match.player2?.name || 'TBD'}</span>
                                {match.player2?.flag && <span className="text-base sm:text-lg flex-shrink-0">{match.player2.flag}</span>}
                              </div>
                            </div>
                            {winner === 'player2' && (
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <span className="text-brand-green text-lg">✓</span>
                                {isCompleted && (
                                  <span className="text-xs text-gray-400 font-semibold">COMPLETED</span>
                                )}
                              </div>
                            )}
                          </div>
                        </button>
                        )
                        })()}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Preview entfernt: Fokus liegt ausschließlich auf aktueller Runde */}
        </div>

        {currentMatches.length === 0 && (
          <div className="bg-brand-panel rounded-lg shadow-sm p-6 sm:p-8 text-center mx-2 sm:mx-0 border border-brand-border">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-white mb-2">No matches available</h3>
            <p className="text-sm sm:text-base text-slate-400">Make predictions in previous rounds first to determine players for this round.</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-brand-panel/90 backdrop-blur-sm rounded-lg p-4 text-center border border-brand-border">
            <div className="text-2xl font-bold text-green-400">{getTotalPredictions()}</div>
            <div className="text-sm text-slate-400">Total Predictions</div>
          </div>
          <div className="bg-brand-panel/90 backdrop-blur-sm rounded-lg p-4 text-center border border-brand-border">
            <div className="text-2xl font-bold text-purple-400">{Math.round((stats.completed / stats.total) * 100)}%</div>
            <div className="text-sm text-slate-400">Tournament Completion</div>
          </div>
          <div className="bg-brand-panel/90 backdrop-blur-sm rounded-lg p-4 text-center border border-brand-border">
            <div className="text-2xl font-bold text-blue-400">{
              rounds.filter((_, i) => {
                const roundMatches = generateMatches(i + 1)
                const roundPredictions = roundMatches.filter((match) => predictions[match.id]).length
                return roundPredictions === rounds[i].matches && roundMatches.every((m) => m.player1 && m.player2)
              }).length
            }</div>
            <div className="text-sm text-slate-400">Completed Rounds</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentPage
