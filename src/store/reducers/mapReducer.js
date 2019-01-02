import { UPDATE_MAP, UPDATE_MARK } from '../actions/actions';

const initState = {
    lng: 25.4739,
    lat: 65.0086,
    zoom: 3,
    markLng: 25.4739,
    markLat: 65.0086,
}

const mapReducer = (state = initState, action) => {

    switch(action.type){
        case UPDATE_MAP:
            return{
                ...state,
                lng: action.lng,
                lat: action.lat,
                zoom: action.zoom,
            }
        case UPDATE_MARK:
            return{
                ...state,
                markLng: action.lng,
                markLat: action.lat
            }
        default:
            return state;
    }
}

export default mapReducer;