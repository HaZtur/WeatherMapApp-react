import axios from 'axios';
import { UPDATE_FORECAST, UPDATE_WEATHER } from './actions'

export const requestWeatherData = (lng, lat) => {

    const params = {
    appid: '28cb7615af6e0ce0a5bbdf9ca7232ada',
    lat: lat,
    lon: lng
    }

    return dispatch => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {params: params})
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: UPDATE_FORECAST,
                    payload: response.data
                })
            }).then(() => {
                axios.get(`https://api.openweathermap.org/data/2.5/weather` , {params: params})
                    .then(response => {
                    console.log(response.data)
                    dispatch({
                        type: UPDATE_WEATHER,
                        payload: response.data
                    })
                })
                .catch(err => console.log(err));
              })
            .catch(err => {
                alert(err);
                console.log(err);})
    }
}
