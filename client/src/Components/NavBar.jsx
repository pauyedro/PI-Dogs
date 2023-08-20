import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs } from "../redux/actions";
import '../styles/NavBar.css'


export default function NavBar() {
    const dispatch= useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs())
    }


    return(
        <div>
            <Link to='/'><button className="btn-nav">Landing Page</button></Link>
            <Link to='/home'><button className="btn-nav" onClick={(e) => handleClick(e)}>Refresh</button></Link>
            <Link to='/createdogs'><button className="btn-nav">Create Dog</button></Link>
        </div>
    )
}