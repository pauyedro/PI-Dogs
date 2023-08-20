import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cleanDog, detailDogsId } from "../redux/actions";
import '../styles/DogDetail.css'

export default function DogDetail() {
    const dispatch= useDispatch();
    const {id} = useParams();

    const dogg= useSelector((state) => state.details);


    useEffect( () => {
        dispatch(detailDogsId(id))
        return dispatch(cleanDog())
    }, [dispatch, id]);

    
    return(
        <div className="card-detail">
            {
                dogg.length === 0
                    ? (<div>
                        <div>
                            <img src='https://www.petdepotstorecr.com/images/pawsDog.gif' alt="loanding"></img>
                        </div>                              
                        <span className="d_loanding">Loading...</span>
                       </div>)
                    : (
                    <div className="cardDetail-conteiner">
                        <div>
                            <h1 className="detail_title">Hi!! Look at my features!</h1>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <img src={dogg.image? dogg.image : "https://i.pinimg.com/originals/52/32/c6/5232c62e7931c8ca1e7acff1be2a000b.png" }  alt='' className="img-detail" />
                        </div>
                        <div>
                            <h2 className="detail-name">{dogg.name}</h2>
                        </div>
                        <div className="detail-detail">
                            <h3>Temperaments: {dogg.createdInDb === true ? dogg.temperaments.map(t => t.name + ' ').join(', ') :  dogg.temperaments.map( t => t + ' ').join(', ')}</h3>
                            <h3>Weight: {dogg.weightMin} - {dogg.weightMax} kg</h3>
                            <h3>Height: {dogg.heightMin} - {dogg.heightMax} cm</h3>
                            <h3>Life span: {dogg.life_span}</h3>
                        </div>
                        <Link to='/home'>
                            <button className="btn-detail">Back to Home</button>
                        </Link>
                    </div>
                    )
            }
            
        </div>
    )

}