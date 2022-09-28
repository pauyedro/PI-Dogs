import axios from 'axios';

export const GET_ALL_DOGS ='GET_ALL_DOGS';
export const GET_ALL_TEMPERAMENTS='GET_ALL_TEMPERAMENTS';
export const GET_BY_NAME='GET_BY_NAME';
export const DETAIL_DOGS_ID='DETAIL_DOGS_ID';
export const CREATE_DOG='CREATE_DOG';
export const FILTER_API_DB='FILTER_API_DB';
export const ORDER_BY='ORDER_BY';
export const FILTER_TEMPERAMENTS='FILTER_TEMPERAMENTS';
export const CLEAN_DOG= 'CLEAN_DOG'

export function getAllDogs () {
    return async function(dispatch) {
        let json= await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data
        })
    }
}

export function getAllTemperaments() {
    return async function(dispatch) {
        let json= await axios.get("http://localhost:3001/temperaments")
            return dispatch({
                type: 'GET_ALL_TEMPERAMENTS',
                payload: json.data
            })
    }
};

export function getByName(name) {
    return async function(dispatch) {
        let json= await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                    type: 'GET_BY_NAME',
                    payload: json.data
            })
    }
};

export function detailDogsId(id) {
    return async function(dispatch) {
       let json= await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                    type: 'DETAIL_DOGS_ID',
                    payload: json.data
            })
    }
};

export function createDog(payload) {
    return async function(dispatch) {
        const created = await axios.post('http://localhost:3001/dogs',payload)
        return dispatch({
            type: 'CREATE_DOG',
            payload: created
        })
    }
};

//FILTROS

export function filterApiDb(payload){
    return{
        type: 'FILTER_API_DB',
        payload
    }
};

export function orderBy(payload){
    return{
        type: 'ORDER_BY',
        payload
    }
};

export function filterTemperaments(payload){
    return{
        type: 'FILTER_TEMPERAMENTS',
        payload,
    }
};

export function cleanDog(){
    return {
        type: 'CLEAN_DOG',
        payload: []
    }
}

// export function getAllDogs() {
//     return function(dispatch) {
//         return fetch('http://localhost:3001/dogs')
//             .then( r => r.json())
//             .then( dogs => {
//                 dispatch({
//                     type: 'GET_ALL_DOGS',
//                     payload: dogs
//                 })
//             })
//     }
// };