import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ActivityItem = ({ to, imageSrc, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center"
  >
    <Link to={to} className="group">
      <div className="relative overflow-hidden rounded-full w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl">
        <img 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" 
          src={imageSrc} 
          alt={title} 
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold">{title}</p>
        </div>
      </div>
      <p className="mt-4 text-center text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{title}</p>
    </Link>
  </motion.div>
);

const Dblock = () => {
  const activities = [
    { to: "/dancesessions", imageSrc: "https://www.shutterstock.com/image-photo/group-energetic-hiphop-dancers-focused-600nw-702288490.jpg", title: "Dance Group" },
    { to: "/yoga", imageSrc: "https://www.constantcontact.com/blog/wp-content/uploads/2021/06/Social-4.jpg", title: "Yoga" },
    { to: "/badminton", imageSrc: "https://lh3.googleusercontent.com/p/AF1QipN9jl0KJ6fk3h6-XdjyfxW1dBmavQXFvTfaN_na=s1360-w1360-h1020", title: "Badminton" },
    { to: "/foosball", imageSrc: "https://image1.masterfile.com/getImage/NjQ5LTA3MDYzNTUyZW4uMDAwMDAwMDA=APu48q/649-07063552en_Masterfile.jpg", title: "Foosball" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
          Explore Our Communites and Activities
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dblock;