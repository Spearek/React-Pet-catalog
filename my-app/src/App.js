import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import  {connect} from 'react-redux';

import './App.css';
import Cockpit from './components/Cockpit/Cockpit';
import Pets from './components/Pets/Pets';
import NewPet from './components/NewPet/NewPet';
import PetCollection from './components/PetCollection/PetCollection';
import MyPets from './components/MyPets/MyPets';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import backgroundImg from './assets/background/halftone-yellow.png';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import Auth from './components/Auth/Auth';
import {storePetsASync, localPetRemoval,sortPets} from './store/actions/actionCreators';



class App extends Component {
  state={
    speciesSelectVal: 'default',
    modalStatus:false,
    sideDrawerOpen:false
  }

  componentDidMount (){
    this.props.getPets()
  }
  
  speciesFilterHandler = (event)=>{
    this.setState({speciesSelectVal: event.target.value});
  }


  modalStatusHandler = (status) =>{
    this.setState({modalStatus:status})
    }

  sideDrawerHandler = () =>{
    this.setState( ( prevState ) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
  } );
  }

  render(){

    let routes = (
      <React.Fragment>
        <Route path='/authorisation' component={Auth}/>
        <Route path='/React-Pet-Catalog' exact render={(props)=>{
          return(
            <Pets
            petList={this.props.pets} 
            click={this.props.removePet}
            visiblity={this.state.speciesSelectVal}
            {...props}/>
        
          )}}/>
      <Route path='/' exact render={(props)=>{
        return( 
          <Pets
          petList={this.props.pets} 
          click={this.props.removePet}
          visiblity={this.state.speciesSelectVal}
          {...props}/>
        
        )}}/>    
      </React.Fragment>
    )

    if(this.props.isAuthenticated){
      routes = (
        <React.Fragment>
          <Route path='/my-collection' component={PetCollection}/>
          <Route path='/my-pets' component={MyPets}/>
          <Route path='/authorisation' component={Auth}/>
          <Route path='/React-Pet-Catalog' exact render={(props)=>{
            return(
              <Pets
              petList={this.props.pets} 
              click={this.props.removePet}
              visiblity={this.state.speciesSelectVal}
              {...props}/>
            
            )}}/>
        <Route path='/' exact render={(props)=>{
          return( 
            <Pets
            petList={this.props.pets} 
            click={this.props.removePet}
            visiblity={this.state.speciesSelectVal}
            {...props}/>
          
          )}}/>    
      </React.Fragment>

      )
    }


  return (
    <div className="App" style={{backgroundImage:`url(${backgroundImg})`}}>

      <Toolbar
      modalHandler={this.modalStatusHandler}
      isDrawerOpen={this.state.sideDrawerOpen}
      burgerClicked={this.sideDrawerHandler}
      isAuth={this.props.isAuthenticated}
      />
      
      <SideDrawer
      modalHandler={this.modalStatusHandler}
      show={this.state.sideDrawerOpen}
      clicked={this.sideDrawerHandler}
      isAuth={this.props.isAuthenticated}/>

      
      <Cockpit
      selected={this.state.speciesSelectVal}
      change={this.speciesFilterHandler}
      speciesList={this.props.species}
      sort={this.props.sortPets}/>

      <NewPet
      species={this.props.species}
      modalStatus={this.state.modalStatus}
      modalHandler={this.modalStatusHandler}
      isAuth={this.props.isAuthenticated}
      />    
      {routes}

    </div>
  );
}
}

const mapStateToProps = state =>{
  return{
    species: state.speciesList,
    pets: state.pets,
    isAuthenticated: state.token !== null
  }
};

const mapDispatchToProps = dispatch =>{
  return{
    getPets:()=>dispatch(storePetsASync()),
    removePet:(id)=>dispatch(localPetRemoval(id)),
    sortPets:(prop)=>dispatch(sortPets(prop))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
