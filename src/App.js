import React from 'react';
import './App.css';
import Axios from 'axios';


class App extends React.Component {

  //state
  state = {
    coords:{
      latitude: 45,
      longitude: 60
    }
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
        Axios.get(`http://api.weatherstack.com/current?access_key=3e3ff8f35d948794fe3b66925fce0e7c&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
          console.log(res)
        })
      })
    } else{ 
      console.log("Not Supported")
    }
  
  }

 render(){
   return (
     <div className="app">


     </div>
   )

 }
}

export default App;
