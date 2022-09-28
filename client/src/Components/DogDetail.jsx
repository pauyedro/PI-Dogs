import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDog, detailDogsId } from "../redux/actions";

export default function DogDetail() {
    const dispatch= useDispatch();
    const {id} = useParams();

    const dogg= useSelector((state) => state.details);


    useEffect( () => {
        dispatch(detailDogsId(id))
        return dispatch(cleanDog())
    }, [dispatch, id]);

    
    return(
        <div>
            {
                dogg.length === 0
                    ? (<div>Loading...</div>)
                    : (
                        <div>
                            <h1>Hi!! Looking my characters!</h1>
                            <h3>Name: {dogg.name}</h3>
                            <h3>Temperaments: {dogg.createdInDb === true ? dogg.temperaments.map(t => t.name + ' ') :  dogg.temperaments.split(', ').map( t => t + ' ')}</h3>
                            <h3>Weight: {dogg.weightMin} - {dogg.weightMax} kg</h3>
                            <h3>Height: {dogg.heightMin} - {dogg.heightMax} cm</h3>
                            <h3>Life span: {dogg.life_span}</h3>
                            <div>
                                <img src={dogg.image? dogg.image : "https://i.pinimg.com/originals/52/32/c6/5232c62e7931c8ca1e7acff1be2a000b.png" }  alt='' width="500px" height="300px" />
                            </div>
                        </div>
                    )
            }
            <Link to='/home'>
                <button>Volver al Home</button>
            </Link>
        </div>
    )

}