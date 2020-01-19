import React, {Component} from 'react';
import './App.css';
import Cockpit from './components/Cockpit/Cockpit';
import Pets from './components/Pets/Pets';
import NewPet from './components/NewPet/NewPet';
import PetCollection from './components/PetCollection/PetCollection';
import axios from './axios-pets';
import {Route} from 'react-router-dom';

import backgroundImg from './assets/background/halftone-yellow.png';
import petCollection from './components/PetCollection/PetCollection';



class App extends Component {
  state={
    pets:null,
    speciesList: ["Cat","Dog","Rodent"],
    speciesSelectVal: 'default',
    modalStatus:false,

  }

  componentDidMount (){
    axios.get('/pets.json')
      .then(response=>{
        let newPets = [];
        for (let key in response.data){
          newPets.push({
            ...response.data[key],
            id: key
          });
        }
       this.setState ({pets:newPets})
      })
  }

  removePetHandler = (petId) =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    console.log(newPetArr[0]);
    const petPosition = newPetArr.findIndex(el => {   //zabezpieczyć na wypadek zwrotu -1;
      return el.id === petId  
    });
    newPetArr.splice(petPosition,1);
    this.setState({pets: newPetArr }); // dodać komunikat gdy nie ma żadnych zwierzaków do wyświetlenia
  }
  
  speciesFilterHandler = (event)=>{
    this.setState({speciesSelectVal: event.target.value});
  }

  sortHandler = (property) =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    newPetArr.sort((a, b) => (a.name > b.name) ? 1 : -1);
    if (property === 'birthYear') newPetArr.reverse();
    this.setState({pets:newPetArr});
  }

  modalStatusHandler = (status) =>{
    this.setState({modalStatus:status})
    }

  render(){


  return (
    <div className="App" style={{backgroundImage:`url(${backgroundImg})`}}>
      <Cockpit
      selected={this.state.speciesSelectVal}
      change={this.speciesFilterHandler}
      speciesList={this.state.speciesList}
      sort={this.sortHandler}/>
      
      <Pets 
        petList={this.state.pets} 
        click={this.removePetHandler}
        visiblity={this.state.speciesSelectVal}/>


      <NewPet
      species={this.state.speciesList}
      modalStatus={this.state.modalStatus}
      modalHandler={this.modalStatusHandler}
      />
      <button onClick={this.modalStatusHandler.bind(this,true)}>Dodaj nowego Zwierzaka</button>

    </div>
  );
}
}

export default App;
