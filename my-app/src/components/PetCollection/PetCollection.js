import React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {fetchUserPetsAsync} from '../../store/actions/actionCreators';

import Pets from '../Pets/Pets';


class PetCollection extends Component{

    render(){

        let favoritePets = null;
        if(this.props.allPets){
            favoritePets = this.props.allPets.filter(el => el.likedBy).filter(el => el.likedBy.some(el => el === this.props.id ));
        }
        return(
            <div>
                <h2>Lista obserwowanych Zwierzaków</h2>
                <Pets
                petList={favoritePets}
                userId={this.props.id}
                visiblity='default'/>
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

export default connect(mapStateToProps) (PetCollection);






