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
      name: "Goodboy",
      species: "Dog",
      favFoods: ["bacon", "chicken", "bbq"],
      birthYear: 2009,
      photo: "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=240&w=470",
      key: 'ibgjlnr453'
    },
    {
      name: "Quika",
      species: "Rodent",
      favFoods: ["grass", "hay"],
      birthYear: 2018,
      photo: "https://images.pexels.com/photos/60693/guinea-pig-cavy-pet-guinea-60693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
      key: 'vckxlqwkoe23'

    },
    {
      name: "Amber",
      species: "Rodent",
      favFoods: ["cheese", "corn","flakes"],
      birthYear: 2015,
      photo: "https://images.pexels.com/photos/51340/rat-pets-eat-51340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800",
      key: 'qweofdsif3534'
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
    speciesList: ["Cat","Dog","Rodent"],
    speciesSelectVal: 'default',
    newPet:[
      {type: 'Imię', value: ''},
      {type: 'Rok urodzenia', value: ''},
      {type: 'Gatunek', value: ''},
      {type: 'Url zdjęcia', value: ''}
    ],
    currentFood:'',
    favFoodList:['meat','cheese']
  }

  removePetHandler = (petKey) =>{
    const newPetArr = JSON.parse(JSON.stringify(this.state.pets));
    const petPosition = newPetArr.findIndex(el => {   //zabezpieczyć na wypadek zwrotu -1;
      return el.key === petKey  
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
      addPet={this.addPetHandler}
      tags={this.state.favFoodList}/>

    </div>
  );
}
}

export default App;
