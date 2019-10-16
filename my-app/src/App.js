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
      photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg"
    },
    {
      name: "Barksalot",
      species: "Dog",
      birthYear: 2008,
      photo:  "https://learnwebcode.github.io/json-example/images/dog-1.jpg"
    },
    {
      name: "Meowsalot",
      species: "Cat",
      favFoods: ["tuna", "catnip", "celery"],
      birthYear: 2012,
      photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg"
    }]
  }

  render(){

  return (
    <div className="App">
      <Cockpit/>
      <Pets petList={this.state.pets}/>
    </div>
  );
}
}

export default App;
