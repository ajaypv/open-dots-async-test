import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blockData = [
  { id: 'a', title: 'Block A', image: 'https://lh3.googleusercontent.com/p/AF1QipPXQKcYFKA65GJlh0rYNooVBplVw0AysYZKvzHc=s1360-w1360-h1020', description: 'Explore the wonders of Block A' },
  { id: 'b', title: 'Block B', image: 'https://lh3.googleusercontent.com/p/AF1QipN2_O0eBNKrjbwQU56tu1LgpY9bRupy6LfBWm3d=s1360-w1360-h1020', description: 'Discover the secrets of Block B' },
  { id: 'c', title: 'Block C', image: 'https://lh3.googleusercontent.com/p/AF1QipNIqrmFIMDKXi0V8jqu8QnTl_HN1H-jiX6_UDEe=s1360-w1360-h1020', description: 'Uncover the mysteries of Block C' },
  { id: 'd', title: 'Block D', image: 'https://lh3.googleusercontent.com/p/AF1QipNCFDRvvw1PVpURpq0swlrFEqJyZmj4wkrM0plN=s1360-w1360-h1020', description: 'Experience the magic of Block D' },
];

const BlockItem = ({ id, title, image, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/${id}block`} className="block w-full h-full">
        <div className="relative w-full h-64 overflow-hidden">
          <img 
            className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-110" 
            src={image} 
            alt={title} 
          />
          <div className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col justify-center items-center h-full text-white p-4">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-center">{description}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-opacity-10 bg-slate-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl font-extrabold text-white text-center mb-12 leading-tight">
          Discover Oracle Blocks
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blockData.map((block) => (
            <BlockItem key={block.id} {...block} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;