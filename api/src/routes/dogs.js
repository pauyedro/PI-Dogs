const { Router } = require('express');
const { default: axios } = require("axios");
require('dotenv').config();
const {getAllDogs, getDogsApi, getDogsDb} = require('../controllers');
const {Dog, Temperament} = require('../db')


const router= Router();

router.get('/', async(req, res) => {
    const {name}= req.query;
    let allDogs= await getAllDogs();
    if(name) {
        try {
            let dogName= allDogs.filter( d => d.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length  
            ? res.status(200).send(dogName) 
            : res.status(404).send('Race not found')
        } catch (e) {
            console.log(e)
        }
    } else {
        res.send(allDogs);
    }
});
  
router.get('/:id', async(req, res) => {
    try {
    const { id } = req.params
        if (id.length < 4) {
            const dog = await getDogsApi()
            const idDog = dog.find(i => i.id == id)
            idDog
                ? res.status(200).send(idDog)
                : res.status(404).json('Dog Not Found')
        } else {
            const dbDog = await getDogsDb();
            // console.log(dbDog)
            const doggy = dbDog.find(i => i.id == id)
            doggy
                ? res.status(200).send(doggy)
                : res.status(404).json('Dog Not Found')
        }
    } catch (error) {
        res.status(404).send(error)
    }
});
 
router.post('/', async(req, res, next) => {
    let {id, name, image, heightMin, heightMax, weightMin, weightMax, temperaments, life_span, createdInDb}= req.body;
    try {
        let newDog= await Dog.create({
            id,
            name,
            image,
            weightMin,
            weightMax,
            heightMin,
            heightMax,
            life_span, 
            createdInDb
        })
        
        const temperamentDb= await Temperament.findAll({
                where: {
                    name: temperaments
                }
            })
        await newDog.addTemperaments(temperamentDb);
        // console.log(newDog)
        return res.send('Successfully created dog')
    } catch (e) {
        next(e)
    }
})


module.exports = router;