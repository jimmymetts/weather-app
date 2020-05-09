import React from 'react';
import './App.css';


class App extends React.Component {

  /* lifcycle method */

  componentDidMount() {
    console.log("Mounted");
    //get device location
    if (navigator.geolocation){
      //console.log("Supported")
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude);
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
