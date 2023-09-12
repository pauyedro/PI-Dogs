import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs } from "../redux/actions";
import '../styles/NavBar.css'
import SearchBar from "./SearchBar";


export default function NavBar() {
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllDogs())
    }


    return (
        <nav className="navContainer">
            <section className="buttons">
                <Link to='/'><button className="btn-nav">Landing Page</button></Link>
                <Link to='/home'><button className="btn-nav" onClick={(e) => handleClick(e)}>Refresh</button></Link>
                <Link to='/createdogs'><button className="btn-nav">Create Dog</button></Link>
            </section>
            <section>
                <h3 className="titleNav">Dogypedia</h3>
            </section>
            <section className="buttons">
                <SearchBar
                />
            </section>
        </nav>
    )
}