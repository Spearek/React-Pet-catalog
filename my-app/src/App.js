import React, {useState , useEffect} from 'react';
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
import Logout from './components/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Footer from './components/Footer/Footer';



const App = props => {

  const [speciesSelectVal,setSpeciesSelectVal] = useState('default');
  const [modalStatus,setModalStatus] = useState(false);
  const [sideDrawerOpen,setSideDrawerOpen] = useState(false);

  useEffect(()=>{
    props.getPets();
    props.authCheck();
  },[])
  
  const speciesFilterHandler = (event)=>{
    setSpeciesSelectVal(event.target.value);
  }

  const modalStatusHandler = (status) =>{
    setModalStatus(status);
    }

  const sideDrawerHandler = () =>{
    setSideDrawerOpen(!sideDrawerOpen)
  }

  const cockpitRouteFragment = (
    <Cockpit
      selected={speciesSelectVal}
      change={speciesFilterHandler}
      speciesList={props.species}
      sort={props.sortPets}
      {...props}/>
  )
  const petsRouteFragment = (
    <Pets
      petList={props.pets} 
      click={props.removePet}
      visiblity={speciesSelectVal}
      userId={props.id}
      {...props}/>
  )

    let routes = (
      <React.Fragment>
        <Route path='/authorisation' component={Auth}/>
        <Route path='/React-Pet-Catalog' exact render={(props)=>{
          return(
            <React.Fragment>
              {cockpitRouteFragment}
              {petsRouteFragment}
            </React.Fragment>   
          )}}/>
        <Route path='/' exact render={(props)=>{
          return( 
            <React.Fragment>
              {cockpitRouteFragment}
              {petsRouteFragment}
            </React.Fragment>
          
          )}}/>    
      </React.Fragment>
    )

    if(props.isAuthenticated){
      routes = (
        <React.Fragment>
          <Route path='/my-collection' component={PetCollection}/>
          <Route path='/my-pets' component={MyPets}/>
          <Route path='/authorisation' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/React-Pet-Catalog' exact render={(props)=>{
            return(
            <React.Fragment>
              {cockpitRouteFragment}
              {petsRouteFragment}
            </React.Fragment>   
          )}}/>
        <Route path='/' exact render={(props)=>{
          return( 
            <React.Fragment>
              {cockpitRouteFragment}
              {petsRouteFragment}
            </React.Fragment>
          
          )}}/> 
      </React.Fragment>

      )
    }

    let loggedAs=localStorage.getItem('email');


  return (
    <div className="App" style={{backgroundImage:`url(${backgroundImg})`}}>

      <Toolbar
      modalHandler={modalStatusHandler}
      isDrawerOpen={sideDrawerOpen}
      burgerClicked={sideDrawerHandler}
      isAuth={props.isAuthenticated}
      />
      
      <SideDrawer
      modalHandler={modalStatusHandler}
      show={sideDrawerOpen}
      clicked={sideDrawerHandler}
      isAuth={props.isAuthenticated}/>

      <NewPet
      species={props.species}
      modalStatus={modalStatus}
      modalHandler={modalStatusHandler}
      isAuth={props.isAuthenticated}
      />
      {(props.isAuthenticated) ? <div className='welcomeUser'><h3>Zalogowano jako: {loggedAs}</h3></div> : null}   
      {routes}
      <Footer/>

    </div>
  );
}

const mapStateToProps = state =>{
  return{
    species: state.speciesList,
    pets: state.pets,
    isAuthenticated: state.token !== null,
    id: state.userId
  }
};

const mapDispatchToProps = dispatch =>{
  return{
    getPets:()=>dispatch(actions.storePetsASync()),
    authCheck:()=>dispatch(actions.authCheckFromToken()),
    removePet:(id)=>dispatch(actions.localPetRemoval(id)),
    sortPets:(prop)=>dispatch(actions.sortPets(prop)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
