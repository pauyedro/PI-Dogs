import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from '../redux/actions';
import "../styles/SearchBar.css"
import lupa from "../styles/img/lupa.png"

function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('') 

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
        // console.log(name);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name))
        setName('')
        
    }

    return(
        <div className="buscar">
            <label htmlFor="name"></label>
                    <input
                        type='text'
                        id='name'
                        autoComplete="on"
                        value={name}
                        placeholder='Search Dog...'
                        onChange={e => handleChange(e)}
                    />
                    <button className="btn-search" type='submit' onClick={(e)=> handleSubmit(e)}><img src={lupa} alt="lupa" className="iconSearch"></img></button>
        </div>
    )
}

export default SearchBar;