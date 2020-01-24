import React, {Component} from 'react';
import axios from './axios-pets';
import {Route} from 'react-router-dom';
import  {connect} from 'react-redux';

import './App.css';
import Cockpit from './components/Cockpit/Cockpit';
import Pets from './components/Pets/Pets';
import NewPet from './components/NewPet/NewPet';
import PetCollection from './components/PetCollection/PetCollection';
import MyPets from './components/MyPets/MyPets';
import Navigation from './components/Navigation/Navigation';
import backgroundImg from './assets/background/halftone-yellow.png';
import {storePetsASync} from './store/actions/actionCreators';



class App extends Component {
  state={
    speciesSelectVal: 'default',
    modalStatus:false,

  }

  componentDidMount (){
    this.props.getPets()
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

      <Navigation
      modalHandler={this.modalStatusHandler}/>
      
      <Cockpit
      selected={this.state.speciesSelectVal}
      change={this.speciesFilterHandler}
      speciesList={this.props.species}
      sort={this.sortHandler}/>

      <NewPet
      species={this.props.species}
      modalStatus={this.state.modalStatus}
      modalHandler={this.modalStatusHandler}
      />

      <Route path='/my-collection' component={PetCollection}/>
      <Route path='/my-pets' component={MyPets}/>
      <Route path='/' exact render={(props)=>{
        return(
        <Pets
        petList={this.props.pets} 
        click={this.removePetHandler}
        visiblity={this.state.speciesSelectVal}
        {...props}/>
        
      )}}/>
      

    </div>
  );
}
}

const mapStateToProps = state =>{
  return{
    species: state.speciesList,
    pets: state.pets
  }
};

const mapDispatchToProps = dispatch =>{
  return{
    getPets:()=>dispatch(storePetsASync())
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
