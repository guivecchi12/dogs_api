import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';



function App() {
  const [dogImage, setDogImage] = useState();
  useEffect(()=>{
    axios
      .get('https://api.thedogapi.com/v1/images/search')
      .then(res => {
        console.log(res);
        setDogImage(res.data[0].url)
      })
      .catch(err => console.log(err))
  },[])
  return (
    <div className="mainDiv">
      <h1 id="header">All about Dogs!</h1>
      <div>
        <img src= {dogImage} alt = {dogImage}></img>
      </div>
    </div>
  );
}

export default App;
