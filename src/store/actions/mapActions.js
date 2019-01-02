import { UPDATE_MAP, UPDATE_MARK } from './actions';

export const requestCoordUpdate =  (lng, lat, zoom) => {
    return dispatch => { 
       dispatch({
           type: UPDATE_MAP, 
           lng: lng, 
           lat: lat, 
           zoom: zoom })
   }
};


export const requestMarkUpdate = (lng, lat) => { 
    return dispatch => {
        dispatch({
            type: UPDATE_MARK, 
            lng: lng, 
            lat: lat}); 
    }
};
