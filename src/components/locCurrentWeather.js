import React from 'react';
import { connect } from 'react-redux';
import LocCurrentWeatherCss from './locCurrentWeather.module.css';

const CurrentWeather = (props) => {
    
    const { data } = props;
    
    if(data === null || !data){
        return <p>Loading...</p>
    }
    return ( 
        <div>
            {console.log(data)}
            <div className={LocCurrentWeatherCss.currentWeather}>
                <h2>Current weather in {data.name}, {data.sys.country}:</h2>
                <h5>{data.weather[0].description.toUpperCase()}</h5>
                <p>Temperature: {(data.main.temp - 273.15).toFixed(0)} &deg;C</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Wind speed: {data.wind.speed} m/s</p>      
            </div>
        </div>
     );
}

const mapStateToProps = (state) => { 
    return{
        data: state.weather.weatherData,
    }
}
 
export default connect(mapStateToProps) (CurrentWeather);