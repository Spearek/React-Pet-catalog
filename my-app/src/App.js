import React, {Component} from 'react';
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
import {storePetsASync, localPetRemoval} from './store/actions/actionCreators';



class App extends Component {
  state={
    speciesSelectVal: 'default',
    modalStatus:false,

  }

  componentDidMount (){
    this.props.getPets()
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
        click={this.props.removePet}
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
    getPets:()=>dispatch(storePetsASync()),
    removePet:(id)=>dispatch(localPetRemoval(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
