import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestWeatherData } from '../store/actions/weatherActions';
import BarPlot from './barPlot';
import CurrentWeather from './locCurrentWeather';
import LocalWeatherCss from './locWeather.module.css';

class LocationWeather extends Component {
    state = {  }
    render() { 
        return ( 
                <div className={LocalWeatherCss.wrapper}>
                    <div className={LocalWeatherCss.header}>
                        <h2 onClick={this.props.handleClick}>- Local Weather Info</h2>
                    </div>
                    <div className={LocalWeatherCss.screen}>
                        <button onClick={() => this.props.requestWeatherData(this.props.lng, this.props.lat)}>Update</button>
                        <CurrentWeather />
                        <div className={LocalWeatherCss.barPlot}><BarPlot /></div>
                    </div>
                </div>
         ); 
    }
}

const mapStateToProps = (state) => {
    return{
      lng: state.mapData.markLng,
      lat: state.mapData.markLat,
    }
}
 
 
export default connect(mapStateToProps, {requestWeatherData}) (LocationWeather);


