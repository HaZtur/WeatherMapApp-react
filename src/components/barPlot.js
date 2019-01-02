import React, { Component } from 'react';
import { connect } from 'react-redux';
import {XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import BarPlotCss from './barPlot.module.css';


class barPlot extends Component {
    
    state = {
        value: false,
    };

    render() {
    
        if(!this.props.data || this.props.data === null){
            return <p>Get local weather information either by double clicking on a location on the map or by performing an address search!</p>
        }else{
            
            const data = this.props.data
            const tempData = data.list.map(e => ({x: e.dt, y: e.main.temp - 273.15}))
            
            return ( 
                <div className={BarPlotCss.plotWrapper}>
                    <h2>5 day forecast:</h2> 
                    <XYPlot height={400} width={800} >
                        
                        <HorizontalGridLines />               
                        <XAxis
                            tickValues={[
                                tempData[0].x,
                                tempData[4].x,
                                tempData[8].x,
                                tempData[12].x, 
                                tempData[16].x,
                                tempData[20].x,  
                                tempData[24].x,
                                tempData[28].x,  
                                tempData[32].x,
                                tempData[36].x,
                            ]}
                            tickFormat={(value) => {
                                    let tmp = data.list.filter(listElement => listElement.dt === value)
                                    return ( 
                                        tmp[0].dt_txt.substring(5, tmp[0].dt_txt.length - 3)
                                        );
                                }
                            }
                        />
                        <YAxis 
                            
                        />
                        <VerticalBarSeries 
                            data={tempData} 
                        />
                    </XYPlot>
                </div>
            );}
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.weather.forecastData,
    }
}
 
export default connect(mapStateToProps) (barPlot);