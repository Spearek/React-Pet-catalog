import React, {Component} from 'react';
import './App.css';
import Cockpit from './components/Cockpit/Cockpit';
import Pets from './components/Pets/Pets';
import Modal from './components/Modal/Modal'


class App extends Component {
  state={
    pets:[
    {
      name: "Purrsloud",
      species: "Cat",
      favFoods: ["wet food", "dry food", "any food"],
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
    speciesSelectVal: 'default',
    sortedBy: {
      birthYear: false,
      name: false
    },
    newPet:[
      {type: 'Imię', value: ''},
      {type: 'Rok urodzenia', value: ''},
      {type: 'Gatunek', value: ''},
      {type: 'Url zdjęcia', value: ''}
    ]
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

  sortHandler = (property) =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    newPetArr.sort((a, b) => (a.name > b.name) ? 1 : -1);
    if (property === 'birthYear') newPetArr.reverse();
    this.setState({pets:newPetArr});
  }
  inputChangeHandler = (event,type) =>{
    const inputIndex = this.state.newPet.findIndex(el =>{
      return el.type === type;
    });
    const input = {
      ...this.state.newPet[inputIndex]
    }
    input.value = event.target.value;
    const newPetList= JSON.parse(JSON.stringify(this.state.newPet));
    newPetList[inputIndex] = input;
    this.setState({newPet : newPetList});
  }
  addPetHandler = (event) =>{
    const adopted = {
      name: this.state.newPet[0].value,
      species: this.state.newPet[2].value,
      birthYear: this.state.newPet[1].value,
      photo: this.state.newPet[3].value,
      key:this.state.newPet[0].value + Math.floor((Math.random() * 500) + 1) + 'kdsfvsd'
    }
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    newPetArr.push(adopted);
    this.setState({pets: newPetArr});
    event.preventDefault();
  }

  

  render(){

  return (
    <div className="App">
      <Cockpit
      selected={this.state.speciesSelectVal}
      change={this.speciesFilterHandler}
      speciesList={this.state.speciesList}
      sort={this.sortHandler}/>
      
      <Pets 
      petList={this.state.pets} 
      click={this.removePetHandler}
      visiblity={this.state.speciesSelectVal}/>

      <Modal
      inputs={this.state.newPet}
      inputHandler={this.inputChangeHandler}
      addPet={this.addPetHandler}/>

    </div>
  );
}
}

export default App;
