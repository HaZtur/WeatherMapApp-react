import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestWeatherData } from '../store/actions/weatherActions';
import { requestCoordUpdate, requestMarkUpdate } from '../store/actions/mapActions';
import mapBoxCss from './mapBox.module.css';

import mapboxgl from 'mapbox-gl';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import MapboxGeoCoder from 'mapbox-gl-geocoder';
import '../../node_modules/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

class MapBox extends Component {

    componentDidMount() {
        const { lng, lat, zoom } = this.props;
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2VwcGFsaGEiLCJhIjoiY2pwc2JubnZ4MTF2bjQ5bjA5ZW5xeWdsOCJ9.AuNwrwH9UP_JcbwKj1ogsg';
    
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/bright-v9',
          center: [lng, lat],
          zoom,
          renderWorldCopies: false,
          showZoom: true,
          doubleClickZoom: false,
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();
      
            this.props.requestCoordUpdate(
              lng.toFixed(4),
              lat.toFixed(4),
              map.getZoom().toFixed(2)
            );
        });
    
        const nav = new mapboxgl.NavigationControl();
    
        map.addControl(nav, 'bottom-right');

        const geocoder = new MapboxGeoCoder({
            accessToken: mapboxgl.accessToken
        });

        map.addControl(geocoder, 'top-left');

        map.on('load', () => {
            map.addLayer({
                "id": "simple-tiles",
                "type": "raster",
                "source": {
                    "type": "raster",
                    "tiles": ["https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=28cb7615af6e0ce0a5bbdf9ca7232ada"],
                    "tileSize": 256
                },
                "minzoom": 0,
                "maxzoom": 22
            })
        })

        map.on('load' || 'dblclick', () => {
            if(map.getSource('single-point') !== undefined || map.getLayer('point') !== undefined)
            {
                map.removeLayer('point')
                map.removeSource('single-point')
            }
            map.addSource('single-point', {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [{
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: []
                        }
                    }]
                }
            })

            map.addLayer({
                "id": "point",
                "source": "single-point",
                "type": "circle",
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "#007cbf"
                }
            });
        });

        geocoder.on('result', (ev) => {
            map.getSource('single-point').setData(ev.result.geometry);
            this.props.requestMarkUpdate(
                ev.result.geometry.coordinates[0],
                ev.result.geometry.coordinates[1]
            )
            this.props.requestWeatherData(ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1])
            console.log(ev.result.geometry);
        });

        map.on('dblclick', (ev) => {
            const eventCoord = ev.lngLat;
            const tempObj = new convertGeoJson('Point', eventCoord.lng.toFixed(6), eventCoord.lat.toFixed(6));
            map.getSource('single-point').setData(tempObj);
             this.props.requestMarkUpdate(
                tempObj.coordinates[0],
                tempObj.coordinates[1]
            )
            this.props.requestWeatherData(tempObj.coordinates[0], tempObj.coordinates[1]);
        });
    }


    render() { 
        /* const { lng, lat, zoom, markLng, markLat } = this.props */
        
        return ( 
            <div>
                <div ref={el => this.mapContainer = el} className={mapBoxCss.mapbox}> <div className={mapBoxCss.tempgrad}><p className={mapBoxCss.tempgradP1}>-40</p><p className={mapBoxCss.tempgradP2}>40&deg;c</p></div> </div>
                {/* <div className={mapBoxCss.coord}>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom} MarkerLng: ${markLng} MarkerLat: ${markLat}`}</div> */}
            </div>
         );
    }
}

function convertGeoJson(type, lng, lat) {
    this.type = type;
    this.coordinates = [lng, lat];
}

const mapStateToProps = (state) => {
    return {
        lng: state.mapData.lng,
        lat: state.mapData.lat,
        zoom: state.mapData.zoom,
        markLng: state.mapData.markLng,
        markLat: state.mapData.markLat

    }
}


 export default connect(mapStateToProps, {requestWeatherData, requestCoordUpdate, requestMarkUpdate}) (MapBox);