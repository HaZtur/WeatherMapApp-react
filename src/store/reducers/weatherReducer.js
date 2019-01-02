import { UPDATE_FORECAST, UPDATE_WEATHER } from '../actions/actions';

const initState = {
    hidden: false,
    forecastData: null,
    weatherData: null
}

const weatherReducer = (state = initState, action) => {
    
    switch(action.type){
        case UPDATE_FORECAST:
            return{
                ...state,
                forecastData: action.payload,
            }
        case UPDATE_WEATHER:
            return{
                ...state,
                weatherData: action.payload,
            }
        default:
            return state;
    }
}

export default weatherReducer;