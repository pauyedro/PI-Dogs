import {useState} from 'react';
import Paginado from "./Paginado";
import {useSelector} from 'react-redux';
import CardDog from "./CardDog";
import "../styles/CardsContainer.css";
import "../styles/CardDog.css"


export default function CardsContainer() {
    const dogsAll= useSelector((state) => state.allDogs);

    //PAGINADO//
    const [currentPage, setCurrentPage]= useState(1);
    const dogsPerPage = 8;
    const indexOfLastDog= currentPage * dogsPerPage //(8) Indice del ultimo perro
    const indexOfFirstDog= indexOfLastDog - dogsPerPage 
    const currentDog= dogsAll?.slice( indexOfFirstDog, indexOfLastDog)
    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }
    return (
        <div >
            <div>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    dogsAll={dogsAll.length}
                    paginado={paginado}
                />
            </div>
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
        </div>
    )
}