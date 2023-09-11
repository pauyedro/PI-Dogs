import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import { filterApiDb, filterTemperaments, getAllDogs, getAllTemperaments, orderBy } from "../redux/actions/index";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Paginado from "./Paginado";
import CardDog from "./CardDog"
import "../styles/CardDog.css"
import "../styles/CardsContainer.css"


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
    const dogsPerPage = 8;
    const indexOfLastDog= currentPage * dogsPerPage //(8) Indice del ultimo perro
    const indexOfFirstDog= indexOfLastDog - dogsPerPage 
    const currentDog= dogsAll?.slice( indexOfFirstDog, indexOfLastDog)
    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }
    
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
            <nav>
                <NavBar/>
                <SearchBar
                    setCurrentPage={setCurrentPage}
                />
            </nav>
            <header>
                <section>
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
                </section>
                <section>
                    <Paginado
                        dogsPerPage={dogsPerPage}
                        dogsAll={dogsAll.length}
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                </section>
                <section>
                    <div className="cards-container">
                        {
                            currentDog?.map((d) => {
                                return(
                                    <div className='card-conteiner' key={d.id}>
                                        <CardDog 
                                            id={d.id} 
                                            name={d.name}
                                            image={d.image? d.image : "https://i.pinimg.com/originals/52/32/c6/5232c62e7931c8ca1e7acff1be2a000b.png"}  
                                            temperaments={d.createdInDb === true ? d.temperaments?.map(t => t.name + ' ') :  d.temperaments?.map( t => t + ' ')} 
                                            weightMin={d.weightMin} 
                                            weightMax={d.weightMax} 
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <br></br>
            </header>
        </div>
    )
};

