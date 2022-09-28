import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css'


export default function NavBar() {
    return(
        <div>
            <Link to='/'><button className="btn-nav">Landing Page</button></Link>
            <Link to='/home'><button className="btn-nav">Home</button></Link>
            <Link to='/createdogs'><button className="btn-nav">Create Dog</button></Link>
        </div>
    )
}