import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Input from "./Input/Input";
import classes from "./NewPet.module.css";
import Tag from "./Tag/Tag";
import Radio from "./Radio/Radio";
import axios from "../../axios-pets";
import Spinner from "../UI/Spinner/Spinner";

import bowlIcon from "../../assets/modal_icons/bowl.svg";
import catIcon from "../../assets/modal_icons/cat.svg";
import dogIcon from "../../assets/modal_icons/dog.svg";
import hamsterIcon from "../../assets/modal_icons/hamster.svg";
import pawsIcon from "../../assets/modal_icons/paws.svg";
import plusIcon from "../../assets/photoshop slices/plus.png";


class NewPet extends Component {   

    state = {
        newPet:[
            {type: 'Imię', value: '',prop:'text'},
            {type: 'Rok urodzenia', value: '',prop:'number'},
            {type: 'Gatunek', value: '', prop:'other'},
            {type: 'Url zdjęcia', value: '', prop:'text'}
          ],
        radioChecked:'',
        favFoodList:[],
        currentFood:'',
        sending:false

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
      
    radioChangeHandler = (event) =>{
        let selectedSpecies = event.target.value;
        this.setState({radioChecked: selectedSpecies});
        }

    favFoodChangeHandler = (event) =>{
        this.setState({currentFood: event.target.value})
        }

    addFoodHandler = () =>{
        const foodList = [...this.state.favFoodList];
        foodList.push(this.state.currentFood);
        this.setState({favFoodList:foodList,currentFood:''})
        }

    removeFoodHandler = (pos) =>{
        const newFoodArr = [...this.state.favFoodList];
        newFoodArr.splice(pos,1);
        this.setState({favFoodList: newFoodArr})
        }
    
    addPetHandler = (event) =>{
        this.setState({sending:true});
        const adopted = {
            name: this.state.newPet[0].value,
            species: this.state.radioChecked,
            favFoods:[...this.state.favFoodList], 
            birthYear: this.state.newPet[1].value,
            photo: this.state.newPet[3].value,
            }
        const cleared = [
            {type: 'Imię', value: '',prop:'text'},
            {type: 'Rok urodzenia', value: '',prop:'number'},
            {type: 'Gatunek', value: '', prop:'other'},
            {type: 'Url zdjęcia', value: '', prop:'text'}];
            
        axios.post('/pets.json',adopted)
          .then(response=>{
              this.setState({sending:false});
            })
          .catch(error =>console.log(error)); 
        this.setState({favFoodList:[], newPet:cleared,radioChecked:'' });
        event.preventDefault();
          }

    render(){
        const favFoodBcg={
            backgroundImage:`url(${bowlIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            backgroundSize:"contain"
        }
        
        const radioList = this.props.species.map((el,pos)=>{
            return(
                <Radio
                position={pos}
                speciesName={el}
                changed={this.radioChangeHandler}
                radioChecked={this.state.radioChecked}
                key={el}
                />
            )
        })
        const inputList = this.state.newPet.map((el,pos)=>{
            if(el.prop!=='other'){
            return(
                <Input
                 newPetData={el}
                 key={pos}
                 changed={(event)=>this.inputChangeHandler(event,el.type)} />
          )}
          return null;
        })
        const tagList = this.state.favFoodList.map((el,pos)=>{
            return(
                <Tag
                foodName={el}
                remove={this.removeFoodHandler.bind(this,pos)}
                key={el + pos}/>
            )
        }) 
        let modalData = (
            <div className={classes.modal}>
                    <h1>Dodaj nowego zwierzaka</h1>
                    <span className={classes.modalClose} onClick={this.props.modalHandler.bind(this,false)}>x</span>
    
                    <form onSubmit={this.addPetHandler}>
    
                        <div className={classes.leftElements}>
                            {inputList} 
                            <div className={classes.radioContainer}>
                                <p>Wybierz typ zwierzaka: </p>
                                <span className={classes.speciesPaws}><img src={pawsIcon} alt="paws icon"/></span>
                                {radioList}
                            </div>
                        </div>   
    
                        <div className={classes.rightElements}>
                            <span><img src={catIcon} alt="cat icon"/></span>
                            <span><img src={dogIcon} alt="dog icon"/></span>
                            <span><img src={hamsterIcon} alt="hamster icon"/></span>
    
                        </div> 
    
                        <div className={classes.tagsContainer}>
                            <input type="text" style={favFoodBcg} placeholder="Ulubione jedzenie" value={this.state.currentFood} onChange={this.favFoodChangeHandler}/>
                            <span onClick={this.addFoodHandler}><img src={plusIcon} alt="plus sign"/></span>
                            {tagList}
                        </div>
    
                        <input type="submit" value="Dodaj"/>
                    </form>
    
                </div>
        )
        if (this.state.sending === true) {
            modalData = <Spinner/>
        }
    
        return(
            <Popup
            open={this.props.modalStatus}
            closeOnDocumentClick
            onClose={this.props.modalHandler.bind(this,false)}
            modal
            >
                {modalData}
            
            </Popup>
        )
    }
};

  export default NewPet;