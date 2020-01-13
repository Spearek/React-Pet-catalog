import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Input from "./Input/Input";
import classes from "./Modal.module.css";
import Tag from "./Tag/Tag";
import Radio from "./Radio/Radio";

import bowlIcon from "../../assets/modal_icons/bowl.svg";
import catIcon from "../../assets/modal_icons/cat.svg";
import dogIcon from "../../assets/modal_icons/dog.svg";
import hamsterIcon from "../../assets/modal_icons/hamster.svg";
import pawsIcon from "../../assets/modal_icons/paws.svg";
import plusIcon from "../../assets/photoshop slices/plus.png";

const favFoodBcg={
    backgroundImage:`url(${bowlIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    backgroundSize:"contain"
}

class Modal extends Component {   

    render(){
        const radioList = this.props.species.map((el,pos)=>{
            return(
                <Radio
                position={pos}
                speciesName={el}
                changed={this.props.radioHandler}
                radioChecked={this.props.radioChecked}
                key={el}
                />
            )
        })
    
        const inputList = this.props.inputs.map((el,pos)=>{
            if(el.prop!=='other'){
            return(
                <Input
                 newPetData={el}
                 key={pos}
                 changed={(event)=>this.props.inputHandler(event,el.type)} />
          )}
          return null;
        })
        const tagList = this.props.tags.map((el,pos)=>{
            return(
                <Tag
                foodName={el}
                remove={this.props.removeFood.bind(this,pos)}
                key={el + pos}/>
            )
        }) 
    
        return(
            <Popup
            open={this.props.modalStatus}
            closeOnDocumentClick
            onClose={this.props.modalHandler.bind(this,false)}
            modal
            >
                <div className={classes.modal}>
                    <h1>Dodaj nowego zwierzaka</h1>
                    <span className={classes.modalClose} onClick={this.props.modalHandler.bind(this,false)}>x</span>
    
                    <form onSubmit={this.props.addPet}>
    
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
                            <input type="text" style={favFoodBcg} placeholder="Ulubione jedzenie" value={this.props.currentFood} onChange={this.props.foodHandler}/>
                            <span onClick={this.props.confirmFoodHandler}><img src={plusIcon} alt="plus sign"/></span>
                            {tagList}
                        </div>
    
                        <input type="submit" value="Dodaj"/>
    
                    </form>
    
                </div>
            
            </Popup>
        )
    }
};

  export default Modal;