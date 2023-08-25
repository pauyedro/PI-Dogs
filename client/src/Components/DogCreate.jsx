import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDog, getAllTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/DogCreate.css"



function validate(input) {
    let errors={};
    if(!input.name || input.name.length === 0) {
        errors.name = 'Name is required'; 
    } else if( input.name.search(/^[a-zA-Z\s]*$/) || input.name.search(/^\S/)) { //name debe contener
        errors.name = 'No numbers, symbols or blanks are allowed in the name'
    };

    if(!input.heightMin) {
        errors.heightMin = 'Enter a minimum height in centimeters';
    } else if( parseInt(input.heightMin) > parseInt(input.heightMax)) {
        errors.heightMin = 'The minimum height cannot be greater than the maximum height';
    } else if( input.heightMin < 0) {
        errors.heightMin = 'The minimum height cannot be negative';
    };
    if(!input.heightMax) {
        errors.heightMax = 'Enter a minimum height in centimeters';
    } else if( parseInt(input.heightMax) < parseInt(input.heightMin)) {
        errors.heightMax = 'The miximum height cannot be minor than the minimum height';
    } else if( input.heightMax < 0) {
        errors.heightMax = 'The maximum height cannot be negative';
    };

    if(!input.weightMin) {
        errors.weightMin = 'Enter a minimum weight in kilograms';
    } else if( parseInt(input.heightMin) > parseInt(input.weightMax)) {
        errors.weightMin = 'The minimum weight cannot be higher than the maximum weight'
    } else if( input.weightMin < 0) {
        errors.heightMin = 'The minimum weight cannot be negative';
    };
    if(!input.weightMax) {
        errors.weightMax = 'Enter a maximum weight in kilograms';
    } else if( parseInt(input.weightMax) < parseInt(input.weightMin)) {
        errors.weightMax = 'The maximum weight cannot be less than the minimum weight'
    } else if( input.weightMax < 0) {
        errors.weightMax = 'The maximum weight cannot be negative';
    };

    return errors;
};

export default function DogCreate() {
    const dispatch= useDispatch();
    const history= useHistory();
    const temps= useSelector((state) => state.allTemperaments);

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        temperaments: [],
        image: '',
        createInDb: false,
    });

    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        if(Object.values(errors).length === 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [errors])

    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value   
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleSelect(e){
        if( !input.temperaments.includes(e.target.value) ) { 
        setInput({
            ...input,
            temperaments:[...input.temperaments, e.target.value]
        })
        } else { 
            setInput ({
                ...input
            })
        }
    };

    function handleSubmit(e){
        e.preventDefault();
        let create = {
            name: input.name,
            heightMin: input.heightMin,
            heightMax: input.heightMax,
            weightMin: input.weightMin,
            weightMax: input.weightMax,
            life_span: input.life_span,
            temperaments: input.temperaments,
            image: input.image
        }
        if(!create.name || !create.heightMin || !create.heightMax || !create.weightMin || !create.weightMax) {
           alert('Aun falta informacion')
        }else {
        dispatch(createDog(create));
        alert('Dog create!!!');
        setInput({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            life_span: '',
            temperament: [],
            image: '',
        })
        history.push('/home')
        }
    }
        

    function handleDelete(e){
        setInput({
            ...input,
            temperaments: input.temperaments.filter( t => t !== e.target.id)
        })
    }

    return (
    <div className="create-container">
        <div className="form-container">
            <h2 className="form-title">¡Create you Dog!</h2>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="grupo">
                        <label className="label">Name: </label>
                        <input
                            type='text'
                            name='name'
                            value={input.name}
                            onChange={(e) => handleChange(e)}
                            className="create-input"
                        /><span className="barra"></span>
                        {
                            errors.name && (
                                <p className="errors">{errors.name}</p>
                            )
                        }
                    </div>
                    <div className="grupo">
                        <label className="label">Height Min: </label>
                        <input
                            type='number'
                            name='heightMin'
                            value={input.heightMin}
                            className="create-input"
                            onChange={(e) => handleChange(e)}
                        /><span className="barra"></span>
                        {
                            errors.heightMin && (
                                <p className="errors">{errors.heightMin}</p>
                            )
                        }
                    </div>
                    <div className="grupo">
                        <label className="label">Height Max: </label>
                        <input
                            type='number'
                            name='heightMax'
                            value={input.heightMax}
                            className="create-input"
                            onChange={(e) => handleChange(e)}
                        /><span className="barra"></span>
                        {
                            errors.heightMax && (
                                <p className="errors">{errors.heightMax}</p>
                            )
                        }
                    </div>
                    <div className="grupo">
                        <label className="label">Weight Min: </label>
                        <input
                            type='number'
                            name='weightMin'
                            value={input.weightMin}
                            className="create-input"
                            onChange={(e) => handleChange(e)}
                        /><span className="barra"></span>
                        {
                            errors.weightMin && (
                                <p className="errors">{errors.weightMin}</p>
                            )
                        }
                    </div>
                    <div className="grupo">
                        <label className="label">Weight Max: </label>
                        <input
                            type='number'
                            name='weightMax'
                            value={input.weightMax}
                            className="create-input"
                            onChange={(e) => handleChange(e)}
                        /><span className="barra"></span>
                        {
                            errors.weightMax && (
                                <p className="errors">{errors.weightMax}</p>
                            )
                        }
                    </div>
                    <div className="grupo">
                        <label className="label">Life span: </label>
                        <input
                            type='number'
                            name='life_span'
                            value={input.life_span}
                            className="create-input"
                            onChange={(e) => handleChange(e)}
                        /><span className="barra"></span>
                    </div>
                    <div className="grupo">
                        <label className="label">Image: </label>
                        <input
                            type='text'
                            name='image'
                            value={input.image}
                            className="create-input"
                            onChange={(e) => handleChange(e)}
                        /><span className="barra"></span>
                    </div>
                    <div className="grupo">
                        <label className="label">Temperaments: </label>
                        <select className="select-create" onChange={(e) => handleSelect(e)}>
                            {
                                temps?.map((t) => (
                                    <option className="option-create" key={t.ID} value={t.name}>{t.name}</option>
                                ))
                            }
                        </select><span className="barra"></span>
                            {
                                input.temperaments.map( (name)=>(
                                    <ul key={name} className="list-create" >
                                        {name}
                                        <button className="btn-remove" id={name} type='button' onCulck={(e) => handleDelete(e)}>X</button>
                                    </ul>
                                ))
                            }
                    
                        </div>
                    <button className="btn-create" disabled={disable} type="submit">Create Dog</button>            
                    <Link to='/home'><button className="btn-create">Back to Home</button></Link>
                </form>
            </div>
        </div>
    </div>
    )

}

