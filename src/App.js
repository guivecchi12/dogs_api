import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';



function App() {
  const [dogImage, setDogImage] = useState();
  const [dogs, setDogs] = useState();
  useEffect(()=>{
    axios
      .get('https://api.thedogapi.com/v1/breeds?limit=175&page=0')
      .then(res => {
        setDogs(res.data)
        console.log("DOGS: ", dogs)
        setDogImage(dogs[0].image.url)
      })
      .catch(err => console.log(err))
      // eslint-disable-next-line
  },[])
  
  return (
    <div className="mainDiv">
      <h1 id="header">All about Dogs!</h1>
      <div className="dogImage">
        Image
        {dogImage ? <img src= {dogImage} alt = {dogImage}></img> : <div>No Image</div>}
      </div>
      <div>
        Information about the breed: {dogs[0].name}
      </div>
    </div>
  );
}

export default App;
