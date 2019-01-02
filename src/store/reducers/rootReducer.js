import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
    mapData: mapReducer,
    weather: weatherReducer
})