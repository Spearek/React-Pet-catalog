import React, {Component} from 'react';
import './App.css';
import Cockpit from './components/Cockpit/Cockpit';
import Pets from './components/Pets/Pets';

class App extends Component {
  state={
    pets:[
    {
      name: "Purrsloud",
      species: "Cat",
      favFoods: ["wet food", "dry food", "<strong>any</strong> food"],
      birthYear: 2016,
      photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg",
      key: 'dsklfjaad'
    },
    {
      name: "Barksalot",
      species: "Dog",
      birthYear: 2008,
      photo:  "https://learnwebcode.github.io/json-example/images/dog-1.jpg",
      key: 'cvkcjxva'
    },
    {
      name: "Meowsalot",
      species: "Cat",
      favFoods: ["tuna", "catnip", "celery"],
      birthYear: 2012,
      photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg",
      key: 'fskadjv'
    }],
    speciesList: [],
    speciesSelectVal: 'default'
  }
  componentDidMount(){
    this.speciesListHandler();
  }

  removePetHandler = (petKey) =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    const petPosition = newPetArr.findIndex(el => {   //zabezpieczyć na wypadek zwrotu -1;
      return el.key === petKey  
    });
    newPetArr.splice(petPosition,1);
    this.setState({pets: newPetArr }); // dodać komunikat gdy nie ma żadnych zwierzaków do wyświetlenia
  }
  
  speciesListHandler = ()=>{
    const list = this.state.pets.map(el =>{
      return el.species;
    }).reduce((acc,val)=>{
      if(acc.indexOf(val)< 0) acc.push(val);
      return acc;
    },[]);
    this.setState({speciesList:list});
  }
  speciesFilterHandler = (event)=>{
    this.setState({speciesSelectVal: event.target.value});
  }

  nameSortHandler = () =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    newPetArr.sort((a, b) => (a.name > b.name) ? 1 : -1)
    this.setState({pets:newPetArr});

  }
  ageSortHandler = () =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    newPetArr.sort((a, b) => (a.birthYear < b.birthYear) ? 1 : -1)
    this.setState({pets:newPetArr});

  }

  render(){

  return (
    <div className="App">
      <Cockpit
      selected={this.state.speciesSelectVal}
      change={this.speciesFilterHandler}
      speciesList={this.state.speciesList}
      nameSort={this.nameSortHandler}
      ageSort={this.ageSortHandler}/>
      
      <Pets 
      petList={this.state.pets} 
      click={this.removePetHandler}
      visiblity={this.state.speciesSelectVal}/>
    </div>
  );
}
}

export default App;
