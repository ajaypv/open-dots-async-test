// Ablock.jsx
import React, { useState } from 'react';



const cafeteriaData = [
    {
      name: "Sunrise Cafe",
      image: "https://images.unsplash.com/photo-1690126671026-623dc4f8370a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      foodItems: ["Pancakes", "Omelette", "Fresh Fruit Bowl", "Coffee"]
    },
    {
      name: "Lunch Lounge",
      image: "https://media.istockphoto.com/id/1411322814/photo/happy-women-eating-at-a-buffet-style-cafeteria.jpg?s=612x612&w=0&k=20&c=YXK6DGEct3j4ckVGH4I5Bh9TCv86gQDPR1otiCXQMA4=",
      foodItems: ["Caesar Salad", "Grilled Chicken Sandwich", "Vegetable Soup", "Iced Tea"]
    },
    {
      name: "Dinner Delight",
      image: "https://source.unsplash.com/400x300/?dinner,restaurant",
      foodItems: ["Steak", "Grilled Salmon", "Vegetarian Pasta", "Cheesecake"]
    }
  ];

const Ablock = () => {
  const [selectedCafeteria, setSelectedCafeteria] = useState(null);

  return (
    <div className="ablock-container">
      <h1 className="ablock-title">Our Cafeterias</h1>
      <div className="cafeteria-list">
        {cafeteriaData.map((cafeteria, index) => (
          <div 
            key={index} 
            className="cafeteria-item"
            onClick={() => setSelectedCafeteria(cafeteria)}
          >
            <img src={cafeteria.image} alt={cafeteria.name} className="cafeteria-image" />
            <h2 className="cafeteria-name">{cafeteria.name}</h2>
          </div>
        ))}
      </div>
      {selectedCafeteria && (
        <div className="food-items-container">
          <h2>{selectedCafeteria.name} Menu</h2>
          <ul className="food-items-list">
            {selectedCafeteria.foodItems.map((item, index) => (
              <li key={index} className="food-item">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Ablock;