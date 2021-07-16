import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dogs, setDogs] = useState();
  const [searchDog, setSearchDog] = useState('');
  const [myDog, setMyDog] = useState();
  var found = false;
  useEffect(()=>{
    // Create an Array with all Dogs
    if(!dogs){
      axios
        .get('https://api.thedogapi.com/v1/breeds?limit=175&page=0')
        .then(res => {
          setDogs(res.data)
        })
        .catch(err => console.log(err))
    }
    else{
      setMyDog(dogs[0])
    }
  }, [dogs])


  const formSubmit = (e) => {
    e.preventDefault();
    // Search Dogs for specific dog
    dogs.forEach(dog => {
      // check for word within the name, example: Labrador within Labrador Retriever
      if(dog.name.toLowerCase().split(' ').includes(searchDog.toLocaleLowerCase()) || dog.name === searchDog){
        found = true
        setMyDog(dog)
      }
    })

    if(!found){
      alert("Search not found, please try again")
    }
    else{
      // Delete and reset Search
      setSearchDog("")
      found = false
    }
  } 
  
  const handleChange = (e) => {
    setSearchDog(e.target.value)
  } 

  return (
    <div className="mainDiv">
      <h1 id="header">All about Dogs!</h1>
      <form className="search"> 
        <input type="text" value={searchDog} name="searchDog" className= "searchBox" onChange = {handleChange}/>
        <button className="searchButton" onClick={formSubmit}>
          Search
        </button>  
      </form>
      <div className="myDog">
        <div className="dogImage">
          { !myDog ? 'Loading . . .' : <img src= {myDog.image.url} alt = {myDog.name}></img>}
        </div>
        <div className ="information">
          <h1 className="informationHeader">Information about the Breed</h1>
          { !myDog ? 
          " Loading . . ." :
          <div className="information infoBody">
            <h2 id="dogName">{myDog.name}</h2>
            <h3 id="origin">Origin: <span className="dogInfo">{myDog.origin}</span></h3>
            <h3 id="origin">Bred for: <span className="dogInfo">{myDog.bred_for}</span></h3>
            <h3 id="origin">Breed group: <span className="dogInfo">{myDog.breed_group}</span></h3>
            <h3 id="weight">Weight: <span className="dogInfo">{myDog.weight.imperial} lbs</span> </h3>
            <h3 id="height"> Height: <span className="dogInfo">{myDog.height.imperial} inches</span></h3>
            <h3 id='temperamentHeader'>Temperament: </h3>
            <p id='temperamentBody'>{myDog.temperament}</p>
          </div>
          }
        </div>
      </div> 
    </div>
  );
}

export default App;
