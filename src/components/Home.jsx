import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blockData = [
  { id: 'a', title: 'Block A', image: 'https://lh3.googleusercontent.com/p/AF1QipPXQKcYFKA65GJlh0rYNooVBplVw0AysYZKvzHc=s1360-w1360-h1020' },
  { id: 'b', title: 'Block B', image: 'https://lh3.googleusercontent.com/p/AF1QipN2_O0eBNKrjbwQU56tu1LgpY9bRupy6LfBWm3d=s1360-w1360-h1020' },
  { id: 'c', title: 'Block C', image: 'https://lh3.googleusercontent.com/p/AF1QipNIqrmFIMDKXi0V8jqu8QnTl_HN1H-jiX6_UDEe=s1360-w1360-h1020' },
  { id: 'd', title: 'Block D', image: 'https://lh3.googleusercontent.com/p/AF1QipNCFDRvvw1PVpURpq0swlrFEqJyZmj4wkrM0plN=s1360-w1360-h1020' },
];

const BlockItem = ({ id, title, image }) => (
  <motion.div 
    className="item"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to={`/${id}block`} className="block-link">
      <div className="circle">
        <img className="responsive-image" src={image} alt={title} />
      </div>
      <p>{title}</p>
    </Link>
  </motion.div>
);

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Welcome to Our Blocks</h1>
      <div className="gallery">
        {blockData.map((block) => (
          <BlockItem key={block.id} {...block} />
        ))}
      </div>
    </div>
  );
}

export default Home;

