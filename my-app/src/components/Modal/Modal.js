import React from 'react';
import Popup from "reactjs-popup";
import Input from "./Input/Input";
import classes from "./Modal.module.css";
import Tag from "./Tag/Tag";

const modal = (props) => {   

    const inputList = props.inputs.map(el=>{
        return(
            <Input
             newPetData={el}
             changed={(event)=>props.inputHandler(event,el.type)} />
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
                <div className={classes.tagsContainer}>
                    <input type="text" placeholder="ulubione jedzenie"/>
                    <Tag/>
                    <Tag/>
                </div>
                <input type="submit" value="Dodaj"/>
            </form>

            </div>
        
        </Popup>
    )};

  export default modal;