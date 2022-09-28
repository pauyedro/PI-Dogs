import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from '../redux/actions';

function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('') //seteo un estado inicial vacio

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
        // console.log(name);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name))
        setName('')
        setCurrentPage(1)
    }

    return(
        <div>
            <h2>Buscador</h2>
            <label htmlFor="name"></label>
                    <input
                        type='text'
                        id='name'
                        autoComplete="off"
                        value={name}
                        placeholder='Search Dog'
                        onChange={e => handleChange(e)}
                    />
                    <button type='submit' onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar;