import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDog, getAllTemperaments } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";



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
        <div>
            <Link to='/home'><button>Back to Home</button></Link>
            <h2>¡Create you Dog!</h2>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Name: </label>
                        <input
                            type='text'
                            placeholder="Dog name..."
                            name='name'
                            value={input.name}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.name && (
                                <p className="errors">{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Height Min: </label>
                        <input
                            type='number'
                            placeholder="Centimeters..."
                            name='heightMin'
                            value={input.heightMin}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.heightMin && (
                                <p className="errors">{errors.heightMin}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Height Max: </label>
                        <input
                            type='number'
                            placeholder="Centimeters..."
                            name='heightMax'
                            value={input.heightMax}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.heightMax && (
                                <p className="errors">{errors.heightMax}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Weight Min: </label>
                        <input
                            type='number'
                            placeholder="Kilograms..."
                            name='weightMin'
                            value={input.weightMin}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.weightMin && (
                                <p className="errors">{errors.weightMin}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Weight Max: </label>
                        <input
                            type='number'
                            placeholder="Kilograms..."
                            name='weightMax'
                            value={input.weightMax}
                            onChange={(e) => handleChange(e)}
                        />
                        {
                            errors.weightMax && (
                                <p className="errors">{errors.weightMax}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Life span: </label>
                        <input
                            type='number'
                            placeholder="Years..."
                            name='life_span'
                            value={input.life_span}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Image: </label>
                        <input
                            type='text'
                            placeholder="URL..."
                            name='image'
                            value={input.image}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label>Temperaments: </label>
                        <select onChange={(e) => handleSelect(e)}>
                            {
                                temps?.map((t) => (
                                    <option key={t.ID} value={t.name}>{t.name}</option>
                                ))
                            }
                        </select>
                            {
                                input.temperaments.map( (name)=>(
                                    <li key={name} >
                                        temperament: {name}
                                        <button id={name} type='button' onClick={(e) => handleDelete(e)}>X</button>
                                    </li>
                                ))
                            }
                    
                        </div>
                    <button disabled={disable} type="submit">Create Dog</button>
                </form>
            </div>
        </div>
    )

}

