const { Router } = require('express');
const { default: axios } = require("axios");
const {API_KEY} = process.env;
require('dotenv').config();
const { Temperament } = require('../db');


const router= Router();

router.get('/', async(req, res, next) => {
    try {
        const url = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const temperament = url.data.map( t => t.temperament);
        const tempMap = temperament.join(', ').split(', ');
        tempMap.map( t => {
            Temperament.findOrCreate({
                where: {
                    name: t
                }
            })
        })
        const allTemperaments = await Temperament.findAll();
        // console.log(allTemperaments);
         return res.send(allTemperaments); 
    } catch (e) {
        next(e)
    }
});

module.exports = router;