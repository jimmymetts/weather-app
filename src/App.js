import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayWeather from './components/DisplayWeather.js';
import NavBar from './components/NavBar.js';


class App extends React.Component {

  //state
  state = {
    coords:{
      latitude: 45,
      longitude: 60
    },
    data: {},
    inputData:""
  }
  
  /* lifcycle method */

  componentDidMount() {
    console.log("Mounted");

    //get device location

    if (navigator.geolocation) {
                                      //console.log("Supported")
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({ coords: newCoords });
                                              //console.log(position.coords.longitude );
        //api call
        Axios.get(`http://api.weatherstack.com/current?access_key=3e3ff8f35d948794fe3b66925fce0e7c&query=${this.state.coords.latitude},${this.state.coords.longitude}&units=f`).then(res => {
          console.log(res)
          
          //object weatherData
          const weatherData = {
            location: res.data.location.name,
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],  //[0] brings back 1st description only
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.pressure,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});
        })
      })
    } else{ 
      console.log("Not Supported")
    }
   
  }

  //tracking the input field
  change = (value) => {
   this.setState({ inputData: value})
  }

  changeWeather = (event) => {
    event.preventDefault();

    // API call
    Axios.get(`http://api.weatherstack.com/current?access_key=3e3ff8f35d948794fe3b66925fce0e7c&query=${this.state.inputData}&units=f`
    ).then(res => {
      //console.log(res)
      const weatherData = {
        location: res.data.location.name,
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],  //[0] brings back 1st description only
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }
      this.setState({ data: weatherData });
    })

  }

 render(){
   return (
     <div className="App">
       <div className="container">

      <NavBar changeWeather = {this.changeWeather}  changeRegion = {this.change}/>
       <DisplayWeather weatherData= { this.state.data }/>

       </div>

     </div>
   )

 }
}

export default App;
