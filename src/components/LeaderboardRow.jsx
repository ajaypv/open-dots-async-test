import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import '../styles/LeaderboardStyles.css'

const LeaderboardRow = ({ player, index }) => (
  <motion.tr
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <td className="rank">
      {index === 0 && <Trophy className="trophy" />}
      {index + 1}
    </td>
    <td className="player-name">{player.name}</td>
    <td className="games-played">{player.gamesPlayed}</td>
    <td className="wins">{player.wins}</td>
    <td className="losses">{player.losses}</td>
    <td className="win-percentage">{(player.wins / player.gamesPlayed * 100).toFixed(1)}%</td>
    <td className="trend">
      {player.trend > 0 ? (
        <ArrowUp className="trend-up" />
      ) : player.trend < 0 ? (
        <ArrowDown className="trend-down" />
      ) : (
        '-'
      )}
    </td>
  </motion.tr>
);

const MatchScheduler = ({ players }) => {
    const [team1Player1, setTeam1Player1] = useState('');
    const [team1Player2, setTeam1Player2] = useState('');
    const [team2Player1, setTeam2Player1] = useState('');
    const [team2Player2, setTeam2Player2] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [matchTime, setMatchTime] = useState('');
  
    const handleScheduleMatch = (e) => {
      e.preventDefault();
      // Here you would typically send this data to your backend
      console.log('Scheduled match:', {
        team1: [team1Player1, team1Player2],
        team2: [team2Player1, team2Player2],
        date: matchDate,
        time: matchTime
      });
      // Reset form
      setTeam1Player1('');
      setTeam1Player2('');
      setTeam2Player1('');
      setTeam2Player2('');
      setMatchDate('');
      setMatchTime('');
    };
  
    return (
      <div className="match-scheduler">
        <h2>Schedule a Match</h2>
        <form onSubmit={handleScheduleMatch}>
          <div className="team-selection">
            <div className="team">
              <h3>Team 1</h3>
              <select value={team1Player1} onChange={(e) => setTeam1Player1(e.target.value)} required>
                <option value="">Select Player 1</option>
                {players.map(player => (
                  <option key={player.name} value={player.name}>{player.name}</option>
                ))}
              </select>
              <select value={team1Player2} onChange={(e) => setTeam1Player2(e.target.value)} required>
                <option value="">Select Player 2</option>
                {players.map(player => (
                  <option key={player.name} value={player.name}>{player.name}</option>
                ))}
              </select>
            </div>
            <div className="team">
              <h3>Team 2</h3>
              <select value={team2Player1} onChange={(e) => setTeam2Player1(e.target.value)} required>
                <option value="">Select Player 1</option>
                {players.map(player => (
                  <option value={player.name}>{player.name}</option>
                ))}
              </select>
              <select value={team2Player2} onChange={(e) => setTeam2Player2(e.target.value)} required>
                <option value="">Select Player 2</option>
                {players.map(player => (
                  <option key={player.name} value={player.name}>{player.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="match-datetime">
            <input 
              type="date" 
              value={matchDate} 
              onChange={(e) => setMatchDate(e.target.value)} 
              required 
            />
            <input 
              type="time" 
              value={matchTime} 
              onChange={(e) => setMatchTime(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="schedule-button">
            <Calendar className="calendar-icon" />
            Schedule Match
          </button>
        </form>
      </div>
    );
  };
  
  const FoosballLeaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [sortBy, setSortBy] = useState('wins');
    const [sortOrder, setSortOrder] = useState('desc');
  
    useEffect(() => {
      // Simulated data fetch
      const fetchData = async () => {
        const data = [
          { name: 'Harshith', gamesPlayed: 20, wins: 15, losses: 5, trend: 2 },
          { name: 'AJay', gamesPlayed: 18, wins: 12, losses: 6, trend: -1 },
          { name: 'Shreya', gamesPlayed: 22, wins: 14, losses: 8, trend: 1 },
          { name: 'Harsha', gamesPlayed: 22, wins: 13, losses: 8, trend: 0 },
          { name: 'Mukesh', gamesPlayed: 21, wins: 16, losses: 5, trend: 3 },
        ];
        setPlayers(data);
      };
      fetchData();
    }, []);
  
    const sortedPlayers = [...players].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    });
  
    const handleSort = (column) => {
      setSortOrder(sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc');
      setSortBy(column);
    };
  
    return (
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">Oracle Foosball Leaderboard</h1>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('rank')}>Rank</th>
              <th onClick={() => handleSort('name')}>Player</th>
              <th onClick={() => handleSort('gamesPlayed')}>Games</th>
              <th onClick={() => handleSort('wins')}>Wins</th>
              <th onClick={() => handleSort('losses')}>Losses</th>
              <th onClick={() => handleSort('winPercentage')}>Win %</th>
              <th>Trend</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <LeaderboardRow key={player.name} player={player} index={index} />
              ))}
            </tbody>
          </AnimatePresence>
        </table>
        <MatchScheduler players={players} />
      </div>
    );
  };
  
  export default FoosballLeaderboard;