import React from "react";
import { Link } from "react-router-dom";
import '../styles/LandingPage.css'

export default function landingPage() {
    return(
        <div>
            <h1 className="titulo">Dogs App</h1>
            <p><img src='https://i.pinimg.com/originals/de/14/1a/de141ac94bf118f396a4ba4cc8f0ae2d.gif' alt=''></img></p>
        
            <Link to= '/home'>
                <button className="btn">WELCOME</button>
            </Link>
        </div>    
    )
}