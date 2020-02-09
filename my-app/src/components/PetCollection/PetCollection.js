import React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {fetchUserPetsAsync} from '../../store/actions/actionCreators';

import Pets from '../Pets/Pets';


class PetCollection extends Component{

    render(){

        let favoritePets = null;
        if(this.props.allPets){
            favoritePets = this.props.allPets.filter(el =>{
                return el.likedBy;
            });
            console.log(favoritePets);
        }
        



        return(
            <div>
                <h2>Lista obserwowanych Zwierzaków</h2>
                <p>W tym miejscu znajdzie się lista zwierzaków obserwowanych przez użytkownia.</p>
                <p>Na ten moment jest to komponent zastępczy. Zapraszam wkrótce.</p>
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

const mapDispatchToProps = dispatch =>{
    return{
      fetchPets:(id)=>dispatch(fetchUserPetsAsync(id)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (PetCollection);






