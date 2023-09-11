import React from "react";
import { Link } from 'react-router-dom';
import '../styles/CardDog.css';

export default function CardDog({ id, name, weightMin, weightMax, temperaments, image, createdInDb }) {
    console.log(id)

    return (
        <div className="card">
            <Link to={`/details/${id}`} className='link'>
                <img src={image} alt='' className="card-img"></img>
                <div className="card-content">
                    <h3 className="nameCard">Name: {name}</h3>
                    <p className="weightCard">Weight: {weightMin} - {weightMax} kg</p>
                    <p className="temperamentCard">Temperaments: {temperaments.join(', ')}</p>
                    <button type="button" className="btn-card">View Dog</button>
                </div>
            </Link>
        </div>
    )
}