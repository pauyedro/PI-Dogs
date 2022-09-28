// import React from "react";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useEffect } from "react";
// import { getAllDogs } from "../redux/actions";
// import LandingPage from "../Components/LandingPage";
// import CardDog from "../Components/CardDog"

// export default function Dogs({currentDog}) {
//     const dispatch= useDispatch();
//     const [carga, setCarga]= useState(true);

//     useEffect(() => {
//         dispatch(getAllDogs())
//             .then(() => setCarga(false))
//     },[dispatch]);

//     return(
//         <div>
//             {
//                 currentDog.length > 0 ?
//                 currentDog.map( d => {
//                     return(
//                         <CardDog
//                             key= {d.id}
//                             id={d.id}
//                             name={d.name}
//                             image={d.image}
//                             temperament={d.temperament}
//                             weight={d.weight}
//                             lifeSpan={d.life_span}
//                             height={d.height}
//                         />
//                     )
//                 }) : (
//                     <LandingPage/>
//                 )
//             }
//         </div>
//     )
// }