import React from "react";


export default function Paginado({dogsPerPage, dogsAll, paginado}) {
    const pageNumber= [];

    for(let i= 0; i<= Math.ceil(dogsAll/dogsPerPage) - 1; i++) {
        pageNumber.push(i+1)
    };
    return (
        <nav>
            <div className="paginado">
                {
                    pageNumber && pageNumber.map(number => (
                        <span key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </span>    
                    ))
                }
            </div>
        </nav>
    )
};
