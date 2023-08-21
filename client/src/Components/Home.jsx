import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import { filterApiDb, filterTemperaments, getAllDogs, getAllTemperaments, orderBy } from "../redux/actions/index";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import "../styles/CardDog.css"
import CardsContainer from "./CardsContainer";


export default function Home() {
    
    const dispatch= useDispatch();
    const [order, setOrder] = useState('')

    const dogsAll= useSelector((state) => state.allDogs);
    const temperamentos= useSelector((state) => state.allTemperaments);
    // console.log(temperamentos);
    // console.log(dogsAll);
    /************************************************* */
    //PAGINADO//
    const [currentPage, setCurrentPage]= useState(1);
    
    /************************************************* */

    useEffect(() => {
        dispatch(getAllDogs())
    },[dispatch])

    useEffect(() => {
        dispatch(getAllTemperaments())
    },[dispatch])

    function handleSort(e) {
        e.preventDefault()
        if(e.target.value === 'All'){
            dispatch(getAllDogs())
        } else {
            dispatch(orderBy(e.target.value))
            setCurrentPage(1)
            setOrder( `Ordenado ${e.target.value}` )
        }
    };

    function handleOrigin(e) {
        e.preventDefault();
        if(e.target.value === 'all'){
            dispatch(getAllDogs())
        } else {
            dispatch(filterApiDb(e.target.value))
            setCurrentPage(1)
            setOrder( `Ordenado ${e.target.value}` )
        }
    };

    function handleFilterTemp(e) {
        e.preventDefault();
        if(e.target.value === 'all'){
            dispatch(getAllTemperaments())
        } else {
            dispatch(filterTemperaments(e.target.value))
            setCurrentPage(1)
            setOrder( `Ordenado ${e.target.value}` )
        }
    }

    return(
        <div>
            <NavBar/>
            <div className="filters">
                <select onChange={e => handleSort(e)}>
                    <option value="">Order By...</option>
                    <option value='All'>All</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option> 
                    <option value="WeightAsc">Weight Ascending</option>
                    <option value="WeightDesc">Weight Descending </option> 
                </select>
                <select onChange={(e) => handleOrigin(e)}>
                    <option value='all'>Filter By Origin</option>
                    <option value='api'>API</option>
                    <option value='created'>Created</option>
                </select>
                <select onChange= {e => handleFilterTemp(e)}>
                    <option value= 'all'>Temperaments...</option>
                    {
                        temperamentos && temperamentos.map( (t) => { 
                            return(    
                                <option key= {t.ID} value= {t.name}>{t.name}</option>
                        )})
                    }
                </select>
            </div>
            <div>
                <CardsContainer dogs = {dogsAll}/>
            </div>
            <div>
                <SearchBar
                setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
};

