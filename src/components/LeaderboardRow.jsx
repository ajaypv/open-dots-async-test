
import '../styles/LeaderboardStyles.css'


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';

const LeaderboardRow = ({ player, index, isMobile }) => (
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
    {!isMobile && (
      <>
        <td className="games-played">{player.gamesPlayed}</td>
        <td className="wins">{player.wins}</td>
      </>
    )}
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

const FoosballLeaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState('wins');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
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

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      <div className="table-responsive">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('rank')}>
                Rank {sortBy === 'rank' && <ChevronDown className={`sort-icon ${sortOrder}`} />}
              </th>
              <th onClick={() => handleSort('name')}>
                Player {sortBy === 'name' && <ChevronDown className={`sort-icon ${sortOrder}`} />}
              </th>
              {!isMobile && (
                <>
                  <th onClick={() => handleSort('gamesPlayed')}>
                    Games {sortBy === 'gamesPlayed' && <ChevronDown className={`sort-icon ${sortOrder}`} />}
                  </th>
                  <th onClick={() => handleSort('wins')}>
                    Wins {sortBy === 'wins' && <ChevronDown className={`sort-icon ${sortOrder}`} />}
                  </th>
                </>
              )}
              <th onClick={() => handleSort('losses')}>
                Losses {sortBy === 'losses' && <ChevronDown className={`sort-icon ${sortOrder}`} />}
              </th>
              <th onClick={() => handleSort('winPercentage')}>
                Win % {sortBy === 'winPercentage' && <ChevronDown className={`sort-icon ${sortOrder}`} />}
              </th>
              <th>Trend</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {sortedPlayers.map((player, index) => (
                <LeaderboardRow key={player.name} player={player} index={index} isMobile={isMobile} />
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
};

export default FoosballLeaderboard;