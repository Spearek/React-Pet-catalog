import React from 'react';
import Popup from "reactjs-popup";
import Input from "./Input/Input";
import classes from "./Modal.module.css";
import Tag from "./Tag/Tag";
import Radio from "./Radio/Radio";

import bowlIcon from "../../assets/modal_icons/bowl.svg";

const favFoodBcg={
    backgroundImage:`url(${bowlIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    backgroundSize:"contain"
}

const modal = (props) => {   

    const radioList = props.species.map((el,pos)=>{
        return(
            <Radio
            position={pos}
            speciesName={el}
            changed={props.radioHandler}
            radioChecked={props.radioChecked}
            key={el}
            />
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
        open={props.modalStatus}
        closeOnDocumentClick
        onClose={props.modalHandler.bind(this,false)}
        modal
        >
            <div className={classes.modal}>
                <h1>Dodaj nowego zwierzaka</h1>
                <span className={classes.modalClose} onClick={props.modalHandler.bind(this,false)}>x</span>

                <form onSubmit={props.addPet}>

                    <div className={classes.leftElements}>
                        {inputList} 
                        <div className={classes.radioContainer}>
                            <p>Wybierz typ zwierzaka: </p>
                            <span className={classes.speciesPaws}><img src={require("../../assets/modal_icons/paws.svg")} alt="paws icon"/></span>
                            {radioList}
                        </div>
                    </div>   

                    <div className={classes.rightElements}>
                        <span><img src={require("../../assets/modal_icons/cat.svg")} alt="cat icon"/></span>
                        <span><img src={require("../../assets/modal_icons/dog.svg")} alt="dog icon"/></span>
                        <span><img src={require("../../assets/modal_icons/hamster.svg")} alt="hamster icon"/></span>

                    </div> 

                    <div className={classes.tagsContainer}>
                        <input type="text" style={favFoodBcg} placeholder="Ulubione jedzenie" value={props.currentFood} onChange={props.foodHandler}/>
                        <span onClick={props.confirmFoodHandler}><img src={require("../../assets/photoshop slices/plus.png")} alt="plus sign"/></span>
                        {tagList}
                    </div>

                    <input type="submit" value="Dodaj"/>

                </form>

            </div>
        
        </Popup>
    )};

  export default modal;