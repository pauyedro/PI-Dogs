import { CREATE_DOG, FILTER_API_DB, FILTER_TEMPERAMENTS, GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_BY_NAME, DETAIL_DOGS_ID, ORDER_BY, CLEAN_DOG } from "../actions";


const initialState= {
    allDogs: [],
    dogs: [],
    allTemperaments: [],
    details:[],
};

function rootReducer(state= initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                allTemperaments: action.payload
            } 
        case GET_BY_NAME:
            if( typeof (action.payload) !== 'object') alert(action.payload);
            let dogSearch = typeof (action.payload) === 'object'? action.payload : state.dogs
            return{
                ...state,
                allDogs: dogSearch
            }
        case DETAIL_DOGS_ID:
            return{
                ...state,
                details: action.payload
            }
        case CREATE_DOG:
            return{
                ...state
            }
        case FILTER_API_DB:
            let doggys = state.dogs;
            let filtrado = []
            switch(action.payload) {
                    case 'api': 
                        filtrado = doggys.filter(el => typeof (el.id) === 'number'); 
                        break;
                    case 'created': 
                        filtrado = doggys.filter(el => isNaN(el.id)); 
                        break;
                    default: 
                        filtrado = doggys; 
                        break;
            }
            return {
                ...state,
                allDogs: filtrado
            };
        case ORDER_BY:
            let copy= [...state.allDogs];
            let ordenamiento= [];
            switch (action.payload) {
                case 'All':
                    ordenamiento= [...state.dogs];
                    break;
                case 'A-Z':
                    ordenamiento= copy.sort(function(a,b) {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        return 0;
                    })
                    break;
                case 'Z-A':
                    ordenamiento= copy.sort(function(a,b) {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        return 0;
                    })
                    break;
                case 'WeightAsc':
                    ordenamiento= copy.sort(function(a,b) {
                        return a.weightMin - b.weightMin
                    });
                    break;
                case 'WeightDesc':
                    ordenamiento= copy.sort(function(a,b) {
                        return b.weightMin - a.weightMin
                    });
                    break;
                default:
                    ordenamiento= copy;
                    break;
            }
            return {
                ...state,
                allDogs: ordenamiento,
            }
        case FILTER_TEMPERAMENTS: // OJO!!! VER COMO SE ESCRIBE TEMPERAMENTS!!!
            const alldogs = state.dogs;
            const dogFind=alldogs.filter(d => d.temperaments?.find(t => t.name === action.payload || t === action.payload))
            console.log(dogFind)
            // console.log(alldogs.map(d=>d.temperaments))
            const temperamentsFilter = action.payload === 'all' ? alldogs : dogFind
        
            return {
                ...state,
                allDogs: temperamentsFilter
            }
        case CLEAN_DOG:
            return {
                ...state,
                details: action.payload
            }
        default:
            return {...state};
    }
};

export default rootReducer;



