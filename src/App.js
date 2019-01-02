import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import MapBox from './components/mapBox';
import Hidden from './components/hidden';
import LocalWeather from './components/locWeather';

class App extends Component {

  state = {
    hidden: true,
  }

  render() {

    return (
       <div className="App">
        <Header />
        <MapBox />
        { this.state.hidden ? 
          <Hidden text = "Local Weather Info" handleClick={this.handleClick} /> : 
          <LocalWeather handleClick={this.handleClick} /> 
        }
      </div>
    );
  }
   
  handleClick = () => {
    let hidden = this.state.hidden ? false : true;
    this.setState({
      hidden: hidden
    })

  }

}


export default App;
