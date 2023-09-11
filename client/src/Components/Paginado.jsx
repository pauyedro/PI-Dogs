import React from "react";
import "../styles/Paginado.css"


export default function Paginado({dogsPerPage, dogsAll, paginado}) {
    const pageNumber= [];

    for(let i= 0; i<= Math.ceil(dogsAll/dogsPerPage) - 1; i++) {
        pageNumber.push(i+1)
    };
    return (
            <div className="paginacion">
                {
                    pageNumber && pageNumber.map(number => (
                        <span key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </span>    
                    ))
                }
            </div>
    )
};
