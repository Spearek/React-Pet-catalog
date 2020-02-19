import React, {Component} from 'react';
import  {connect} from 'react-redux';
import  * as actions from '../../store/actions/index';

import Pets from '../Pets/Pets';


const PetCollection = props =>{

        let favoritePets = null;
        if(props.allPets){
           favoritePets = props.allPets.filter(el => el.likedBy).filter(el => el.likedBy.some(el => el === props.id ));
        }
        let noneFavorites = null;
        if (favoritePets && favoritePets.length < 1){
            noneFavorites = <p style={{fontSize:'22px',fontWeight:'600',color:'red', marginTop:'10%'}}>Nie obserwujesz obecnie żadnych zwierzaków.</p>
        }
        return(
            <div>
                <h2>Lista obserwowanych Zwierzaków</h2>
                <Pets
                petList={favoritePets}
                userId={props.id}
                click={props.removePet}
                visiblity='default'/>
                {noneFavorites}
                
            </div>
            
        )
}

const mapStateToProps = state =>{
    return{
      id: state.userId,
      allPets: state.pets
    }
  };

const mapDispatchToProps = dispatch =>{
    return{
      removePet:(id)=>dispatch(actions.localPetRemoval(id))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (PetCollection);






