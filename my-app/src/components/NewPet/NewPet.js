import React, {useState} from 'react';
import Popup from "reactjs-popup";
import Input from "./Input/Input";
import classes from "./NewPet.module.css";
import Tag from "./Tag/Tag";
import Radio from "./Radio/Radio";
import Spinner from "../UI/Spinner/Spinner";
import {connect} from 'react-redux';

import bowlIcon from "../../assets/modal_icons/bowl.svg";
import catIcon from "../../assets/modal_icons/cat.svg";
import dogIcon from "../../assets/modal_icons/dog.svg";
import hamsterIcon from "../../assets/modal_icons/hamster.svg";
import pawsIcon from "../../assets/modal_icons/paws.svg";
import plusIcon from "../../assets/photoshop slices/plus.png";
import * as actions from '../../store/actions/index';


const NewPet = props => {   

    const [newPet,setNewPet] = useState([
        {type: 'Imię', value: '',prop:'text'},
        {type: 'Rok urodzenia', value: '',prop:'number'},
        {type: 'Gatunek', value: '', prop:'other'},
        {type: 'Url zdjęcia', value: '', prop:'text'}
          ]);
    
    const [radioChecked,setRadioChecked] = useState('');
    const [favFoodList,setFavFoodList] = useState([]);
    const [currentFood,setCurrentFood] = useState('');
    const [sendingStatus,setSendingStatus] = useState(false);
          
    const inputChangeHandler = (event,type) =>{
        const inputIndex = newPet.findIndex(el =>{
          return el.type === type;
        });
        const input = {
          ...newPet[inputIndex]
        }
        input.value = event.target.value;
        const newPetList= JSON.parse(JSON.stringify(newPet));
        newPetList[inputIndex] = input;
        setNewPet(newPetList);
      }
      
    const radioChangeHandler = (event) =>{
       setRadioChecked(event.target.value);
        }

    const favFoodChangeHandler = (event) =>{
       setCurrentFood(event.target.value);
        }

    const addFoodHandler = () =>{
        const withSpacesRemoved = currentFood.replace(/\s+/g, '');
        if (withSpacesRemoved.length < 3 || withSpacesRemoved.length > 15) {
            window.alert('Ulubione jedzenie musi mieć pomiędzy 3 a 15 znaków!');
        } else {
            const foodList = [...favFoodList];
            foodList.push(currentFood);
            setFavFoodList(foodList);
            setCurrentFood('');
            }
        }

    const removeFoodHandler = (pos) =>{
        const newFoodArr = [...favFoodList];
        newFoodArr.splice(pos,1);
        setFavFoodList(newFoodArr);
        }
    
    const addPetHandler = () =>{
        const adopted = {
            name: newPet[0].value,
            species: radioChecked,
            favFoods:[...favFoodList], 
            birthYear: newPet[1].value,
            photo: newPet[3].value,
            addedBy: props.user
            }
        
        props.addPet(adopted,props.token,props.haveErr);

        const cleared = [
            {type: 'Imię', value: '',prop:'text'},
            {type: 'Rok urodzenia', value: '',prop:'number'},
            {type: 'Gatunek', value: '', prop:'other'},
            {type: 'Url zdjęcia', value: '', prop:'text'}];

            setFavFoodList([]);
            setNewPet(cleared);
            setRadioChecked('');
          }

        const favFoodBcg={
            backgroundImage:`url(${bowlIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
            backgroundSize:"contain"
        }
        
        const radioList = props.species.map((el,pos)=>{
            return(
                <Radio
                position={pos}
                speciesName={el}
                changed={radioChangeHandler}
                radioChecked={radioChecked}
                key={el}
                />
            )
        })
        const inputList = newPet.map((el,pos)=>{
            if(el.prop!=='other'){
            return(
                <Input
                 newPetData={el}
                 key={pos}
                 changed={(event)=>inputChangeHandler(event,el.type)} />
          )}
          return null;
        })
        const tagList = favFoodList.map((el,pos)=>{
            return(
                <Tag
                foodName={el}
                remove={removeFoodHandler.bind(this,pos)}
                key={el + pos}/>
            )
        }) 

        let modalData=(
            <div>
                <h3>Opcja dostępna wyłacznie dla autoryzowanych użytkowników</h3>
                <p>Zaloguj się lub załóż konto aby mieć możliwość dodania własnego zwierzaka. </p>
                <button onClick={props.modalHandler.bind(this,false)}>Zamknij</button>
            </div>
        )
        if(props.isAuth && !props.isLoading ){
            modalData = (
                <div className={classes.modal}>
                        <h1>Dodaj nowego zwierzaka</h1>
                        <span className={classes.modalClose} onClick={props.modalHandler.bind(this,false)}>x</span>
        
                        <form onSubmit={addPetHandler}>
        
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
                                <input type="text" style={favFoodBcg} placeholder="Ulubione jedzenie" value={currentFood} onChange={favFoodChangeHandler}/>
                                <span onClick={addFoodHandler}><img src={plusIcon} alt="plus sign"/></span>
                                {tagList}
                            </div>
        
                            <input type="submit" value="Dodaj"/>
                        </form>
        
                    </div>
            )

        }
        if (props.isAuth && props.isLoading) {
            modalData = <Spinner/>
        }
    
        return(
            <Popup
            open={props.modalStatus}
            closeOnDocumentClick
            onClose={props.modalHandler.bind(this,false)}
            modal
            >
                    {modalData}
           
            </Popup>
        )
};

const mapStateToProps = state =>{
    return{
      isLoading: state.newPetLoading,
      haveErr: state.newPerError,
      token: state.token,
      user: state.userId
    }
  };
  
  const mapDispatchToProps = dispatch =>{
    return{
      addPet: (adopted,token,err) =>dispatch(actions.addNewPetAsync(adopted,token,err))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (NewPet);