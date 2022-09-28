const {API_KEY} = process.env;
const axios = require('axios');
const { Dog, Temperament } = require('../db')


const getDogsApi= async() => {
    const url= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    // console.log(url);
    const apiInfo = await url.data?.map( e => {
        let weightMin = parseInt(e.weight.metric.slice(0, 2).trim()); 
        let weightMax = parseInt(e.weight.metric.slice(4).trim());
        let heightMin = parseInt(e.height.metric.slice(0, 2).trim()); 
        let heightMax = parseInt(e.height.metric.slice(4).trim());
        
        return {
            id: e.id,
            name: e.name,
            weightMin: weightMin,
            weightMax: weightMax,
            heightMin: heightMin,
            heightMax: heightMax,
            life_span: e.life_span,
            temperaments: typeof(e.temperament) === 'string'? e.temperament.split(', ') : e.temperament ,
            image: e.image.url,
            createdInDb: false,
        }      
    }) 
    // console.log(apiInfo)
    return apiInfo;
};
   

const getDogsDb= async() => {
    const dogs = await Dog.findAll({
        include: {
            model: Temperament,
        }
    })
    // const info= dogs.map( d => {
    //     let temp= d.temperaments.map(t => t.name);
    //     let arrTemperaments= temp.join(', ');
    //     return {
    //         id: d.id,
    //         name: d.name,
    //         weightMin: parseInt(d.weightMin),
    //         weightMax: parseInt(d.weightMax),
    //         heightMin: parseInt(d.heightMin),
    //         heightMax: parseInt(d.heightMax),
    //         life_span: d.life_span,
    //         temperaments: arrTemperaments,
    //         createdInBd: true,
    //         image: d.image
    //     }
    // })
    // console.log(info)
    return dogs;
};

const getAllDogs= async () => {
    const api= await getDogsApi();
    const db= await getDogsDb();
    const allDogs= api.concat(db);
    return allDogs;
};



module.exports = {getDogsApi, getDogsDb, getAllDogs}