import React from 'react';
import Popup from "reactjs-popup";
import Input from "./Input/Input";
import classes from "./Modal.module.css";
import Tag from "./Tag/Tag";
import Radio from "./Radio/Radio"

const modal = (props) => {   

    const radioList = props.species.map(el=>{
        return(
            <Radio
            speciesName={el}
            changed={props.radioHandler}
            radioChecked={props.radioChecked}
            key={el}/>
        )
    })

    const inputList = props.inputs.map((el,pos)=>{
        if(el.prop!=='other'){
        return(
            <Input
             newPetData={el}
             key={pos}
             changed={(event)=>props.inputHandler(event,el.type)} />
      )}
      return null;
    })
    const tagList = props.tags.map((el,pos)=>{
        return(
            <Tag
            foodName={el}
            remove={props.removeFood.bind(this,pos)}
            key={el + pos}/>
        )
    }) 

    return(
        <Popup
        trigger={<img src={require("../../assets/photoshop slices/plus.png")} alt="plus sign"/>}
        modal
        closeOnDocumentClick
        >
            <div className={classes.modal}>
            <form onSubmit={props.addPet}>
                {inputList} 
                <div>
                    {radioList}
                </div>
                
                <div className={classes.tagsContainer}>
                    <input type="text" placeholder="ulubione jedzenie" value={props.currentFood} onChange={props.foodHandler}/>
                    <span onClick={props.confirmFoodHandler}><img src={require("../../assets/photoshop slices/plus.png")} alt="plus sign"/></span>
                    {tagList}
                </div>
                <input type="submit" value="Dodaj"/>
            </form>

            </div>
        
        </Popup>
    )};

  export default modal;