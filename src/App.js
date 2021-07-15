import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';



function App() {
  const [dogImage, setDogImage] = useState();
  const [dogs, setDogs] = useState();
  const [searchDog, setSearchDog] = useState();
  const [myDog, setMyDog] = useState();
  useEffect(()=>{
    axios
      .get('https://api.thedogapi.com/v1/breeds?limit=175&page=0')
      .then(res => {
        setDogs(res.data)
        console.log("DOGS: ", dogs[0])
        setDogImage(dogs[0].image.url)
      })
      .catch(err => console.log(err))
      // eslint-disable-next-line
  },[])

  const formSubmit = (e) => {
    e.preventDefault();

    // Search Dogs for specific dog
    if(dogs !== undefined){
      dogs.forEach(dog => {
        if(myDog in dog.name){
          console.log(dog)
        }
      })
      // Delete Search
      setSearchDog("")
    }    
  } 
  
  const handleChange = (e) => {
    setSearchDog(e.target.value)
  } 

  return (
    <div className="mainDiv">
      <h1 id="header">All about Dogs!</h1>
      <form onSubmit={formSubmit}>
        <label>
          <input type="text" value={searchDog} name="searchDog" onChange = {handleChange}/>
        </label>        
        <input type="submit" value="Submit" className="searchButton"/>
      </form>
      <div className="dogImage">
        {dogImage ? <img src= {dogImage} alt = {dogImage}></img> : <div>No Image</div>}
      </div>
      <div>
        Information about the breed:
        {dogImage ? <div>{dogs[0].name}</div> : <div>Loading</div>}
         

      </div>
    </div>
  );
}

export default App;
