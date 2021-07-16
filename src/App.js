import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';



function App() {
  const [dogs, setDogs] = useState();
  const [searchDog, setSearchDog] = useState('');
  const [myDog, setMyDog] = useState();
  var found = false;
  useEffect(()=>{
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
      if(dog.name.toLowerCase().split(' ').includes(searchDog.toLocaleLowerCase())){
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
      <form onSubmit={formSubmit}>
        <label>
          <input type="text" value={searchDog} name="searchDog" onChange = {handleChange}/>
        </label>        
        <input type="submit" value="Submit" className="searchButton"/>
      </form>
      <div className="dogImage">
        { !myDog ? 'Loading . . .' : <img src= {myDog.image.url} alt = {myDog.name}></img>}
      </div>
      <div>
        <h2>Information about the breed:</h2>
        { !myDog ? 
        " Loading . . ." :
        <div>
          <h3>{myDog.name}</h3>
          <h4>Origin: {myDog.origin}</h4>
          <h5>Weight: {myDog.weight.imperial} lbs </h5>
          <h5> Height: {myDog.height.imperial} inches</h5>
          <h5>Temperament: </h5>
          <p>{myDog.temperament}</p>
        </div> 
        }
      </div>
    </div>
  );
}

export default App;
