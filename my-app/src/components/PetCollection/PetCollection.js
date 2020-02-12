import React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {localPetRemoval} from '../../store/actions/actionCreators';

import Pets from '../Pets/Pets';


class PetCollection extends Component{

    render(){

        let favoritePets = null;
        if(this.props.allPets){
            favoritePets = this.props.allPets.filter(el => el.likedBy).filter(el => el.likedBy.some(el => el === this.props.id ));
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
                userId={this.props.id}
                click={this.props.removePet}
                visiblity='default'/>
                {noneFavorites}
                
            </div>
            
        )
    }

    
}

const mapStateToProps = state =>{
    return{
      id: state.userId,
      allPets: state.pets
    }
  };

const mapDispatchToProps = dispatch =>{
    return{
      removePet:(id)=>dispatch(localPetRemoval(id))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (PetCollection);






