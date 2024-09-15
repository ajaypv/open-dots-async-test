import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

const AvailabilityTimeline = ({ players }) => {
  const [availabilities, setAvailabilities] = useState({});
  const [currentUser, setCurrentUser] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    const initialAvailabilities = players.reduce((acc, player) => {
      acc[player.name] = [];
      return acc;
    }, {});
    setAvailabilities(initialAvailabilities);
   
  }, [players]);

  const toggleAvailability = (time) => {
    setAvailabilities(prev => {
      const userAvailability = prev[currentUser] || [];
      const updatedAvailability = userAvailability.includes(time)
        ? userAvailability.filter(t => t !== time)
        : [...userAvailability, time];
      
      return {
        ...prev,
        [currentUser]: updatedAvailability
      };
    });
  };

  const formatTime = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}${period}`;
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="availability-timeline bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Availability Timeline</h2>
      
      {/* Date Selection */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => changeDate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-xl font-semibold">
          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
        <button 
          onClick={() => changeDate(1)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* User Selection */}
      <div className="mb-6">
        <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700 mb-2">Select User:</label>
        <select
          id="userSelect"
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {players.map(player => (
            <option key={player.name} value={player.name}>{player.name}</option>
          ))}
        </select>
      </div>
      
      {/* Timeline */}
      <div className="grid grid-cols-12 gap-2 mb-6">
        {timeSlots.map(hour => (
          <motion.div
            key={hour}
            className={`time-slot cursor-pointer p-2 rounded-md flex flex-col items-center justify-center ${
              availabilities[currentUser]?.includes(hour) ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleAvailability(hour)}
          >
            <Clock size={16} className="mb-1" />
            <span className="text-xs font-medium">{formatTime(hour)}</span>
          </motion.div>
        ))}
      </div>
      
      {/* User Availabilities */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">User Availabilities</h3>
        <div className="space-y-4">
          {players.map(player => (
            <div key={player.name} className="flex items-start">
              <User size={20} className="mr-3 mt-1 text-gray-500" />
              <div>
                <span className="font-medium text-gray-700 mr-2">{player.name}:</span>
                <div className="flex flex-wrap mt-1">
                  {availabilities[player.name]?.sort((a, b) => a - b).map(hour => (
                    <span key={hour} className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1">
                      {formatTime(hour)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTimeline;