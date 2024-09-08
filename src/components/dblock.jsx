import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/dblock.css'


const Dblock = () => {
    return (
        <>
        <div className="gallery">
        <div className="item">
        <Link to="/dancesessions">
      
      <div className="circle">
        <img className="responsive-image" src="https://www.shutterstock.com/image-photo/group-energetic-hiphop-dancers-focused-600nw-702288490.jpg" alt="circle" />
      </div>
      <p>Dance Group</p>
      </Link>
    </div>
    <div className="item">
      <div className="circle">
        <img className="responsive-image" src="https://www.constantcontact.com/blog/wp-content/uploads/2021/06/Social-4.jpg" alt="circle" />
      </div>
      <p>Yoga</p>
    </div>
    <div className="item">
      <div className="circle">
        <img className="responsive-image" src="https://lh3.googleusercontent.com/p/AF1QipN9jl0KJ6fk3h6-XdjyfxW1dBmavQXFvTfaN_na=s1360-w1360-h1020" alt="circle" />
      </div>
      <p>Batmantion</p>
    </div>
    <div className="item">

    <Link to="/foosball">
    
      <div className="circle">
        <img className="responsive-image" src="https://image1.masterfile.com/getImage/NjQ5LTA3MDYzNTUyZW4uMDAwMDAwMDA=APu48q/649-07063552en_Masterfile.jpg" alt="circle" />
      </div>
      <p>foose ball</p>
      </Link>
     
     
    </div>
    </div>

   </>
    
        
    )

}

export default Dblock;