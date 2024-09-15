import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowUp, ArrowDown, Calendar, Clock, UserPlus } from 'lucide-react';

const LeaderboardRow = ({ player, index }) => {
  const isTopThree = index < 3;
  const rowVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -50 }
  };

  return (
    <motion.tr
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={rowVariants}
      className={`text-sm md:text-base hover:bg-gray-100 transition-colors duration-200 ${isTopThree ? 'font-bold' : ''}`}
    >
      <td className="p-2 md:p-3 text-center">
        {index === 0 && <Trophy className="w-6 h-6 text-yellow-500 inline-block" />}
        {index === 1 && <Trophy className="w-5 h-5 text-gray-400 inline-block" />}
        {index === 2 && <Trophy className="w-4 h-4 text-yellow-700 inline-block" />}
        <span className={`ml-1 md:ml-2 font-semibold ${isTopThree ? 'text-lg' : ''}`}>{index + 1}</span>
      </td>
      <td className="p-2 md:p-3 font-medium">
        <div className="flex items-center">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${player.name}`}
            alt={`${player.name}'s avatar`}
            className="w-8 h-8 rounded-full mr-2"
          />
          {player.name}
        </div>
      </td>
      <td className="p-2 md:p-3">{player.gamesPlayed}</td>
      <td className="p-2 md:p-3 font-semibold text-green-600">{player.wins}</td>
      <td className="p-2 md:p-3 font-semibold text-red-600">{player.losses}</td>
      <td className="p-2 md:p-3">{(player.wins / player.gamesPlayed * 100).toFixed(1)}%</td>
      <td className="p-2 md:p-3">
        {player.trend > 0 ? (
          <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-green-500 inline-block" />
        ) : player.trend < 0 ? (
          <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-red-500 inline-block" />
        ) : (
          <span className="text-gray-400">-</span>
        )}
        <span className={`ml-1 ${player.trend > 0 ? 'text-green-500' : player.trend < 0 ? 'text-red-500' : 'text-gray-400'}`}>
          {Math.abs(player.trend)}
        </span>
      </td>
    </motion.tr>
  );
};

const AvailabilityTimeline = ({ availabilities, currentUser, onJoin }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="mt-8 md:mt-12 bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800">Today's Availability Timeline</h2>
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full">
          {hours.map((hour) => (
            <div key={hour} className="w-16 md:w-20 text-center">
              <div className="text-xs font-medium text-gray-500">{`${hour}:00`}</div>
              <div className="h-20 md:h-24 border-r border-gray-200 relative">
                {availabilities
                  .filter((a) => a.startHour <= hour && a.endHour > hour)
                  .map((availability, index) => (
                    <motion.div
                      key={`${availability.user}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 right-0 bg-blue-100 rounded-md p-1 text-xs shadow-sm"
                      style={{ top: `${index * 25}%` }}
                    >
                      <span className="font-medium text-blue-800">{availability.user}</span>
                      {currentUser !== availability.user && (
                        <button
                          onClick={() => onJoin(availability)}
                          className="ml-1 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        >
                          <UserPlus className="w-3 h-3" />
                        </button>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AvailabilitySelector = ({ onAvailabilitySet }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAvailabilitySet(startTime, endTime);
    setStartTime('');
    setEndTime('');
  };

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">Set Your Availability</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select start time</option>
              {timeOptions.map((time) => (
                <option key={`start-${time}`} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <select
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select end time</option>
              {timeOptions.map((time) => (
                <option key={`end-${time}`} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
          <Clock className="w-5 h-5 mr-2" />
          Set Availability
        </button>
      </form>
    </div>
  );
};

const FoosballLeaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState('wins');
  const [sortOrder, setSortOrder] = useState('desc');
  const [availabilities, setAvailabilities] = useState([]);
  const [currentUser, setCurrentUser] = useState('Harshith'); // For demo purposes

  useEffect(() => {
    // Simulated data fetch
    const fetchData = async () => {
      const data = [
        { name: 'Harshith', gamesPlayed: 20, wins: 15, losses: 5, trend: 2 },
        { name: 'AJay', gamesPlayed: 18, wins: 12, losses: 6, trend: -1 },
        { name: 'Shreya', gamesPlayed: 22, wins: 14, losses: 8, trend: 1 },
        { name: 'Harsha', gamesPlayed: 22, wins: 13, losses: 8, trend: 0 },
        { name: 'Mukesh', gamesPlayed: 21, wins: 16, losses: 5, trend: 3 },
        {name: 'Pavan', gamesPlayed: 21, wins: 16, losses: 5, trend: 3},
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

  const handleAvailabilitySet = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    setAvailabilities([
      ...availabilities,
      {
        user: currentUser,
        startHour: startHour + startMinute / 60,
        endHour: endHour + endMinute / 60,
      },
    ]);
  };

  const handleJoin = (availability) => {
    console.log(`${currentUser} joined ${availability.user}'s game`);
    // Here you would typically update the backend
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">Oracle Foosball Leaderboard</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleSort('rank')}>Rank</th>
                <th className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleSort('name')}>Player</th>
                <th className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleSort('gamesPlayed')}>Games</th>
                <th className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleSort('wins')}>Wins</th>
                <th className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleSort('losses')}>Losses</th>
                <th className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleSort('winPercentage')}>Win%</th>
                <th className="p-2 md:p-3">Trend</th>
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
        </div>
      </div>
      <AvailabilitySelector onAvailabilitySet={handleAvailabilitySet} />
      <AvailabilityTimeline
        availabilities={availabilities}
        currentUser={currentUser}
        onJoin={handleJoin}
      />
    </div>
  );
};

export default FoosballLeaderboard;