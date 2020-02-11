import React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {fetchUserPetsAsync} from '../../store/actions/actionCreators';

import Pets from '../Pets/Pets';


class MyPets extends Component {

    componentDidMount(){
        this.props.fetchPets(this.props.id,this.props.needToFetch);
    }

    render(){

        let nonePets = null;
        
        if((this.props.userPets) && (this.props.userPets.length < 1)){
            nonePets = <p style={{fontSize:'22px',fontWeight:'600',color:'red', marginTop:'10%'}}>Nie masz jeszcze żadnych dodanych zwierzaków.</p>;
        }


        return(
            <div>
                <h2>Lista dodanych Zwierzaków. </h2>
                <p>Poniżej znajduje się lista dodanych przez Ciebie zwierzaków.</p>
                <p>W każdej chwili możesz usunąć wybranego zwierzaka z aplikacji klikając na <span style={{color:'white',fontSize:'16px',marginTop:'10px',display:'inline-block',fontWeight:'600',background:'red',padding:'5px 15px',borderRadius:'5px'}}>X</span></p>
                <Pets
                petList={this.props.userPets}
                userId={this.props.id}
                visiblity='default'
                myPetsSection
                />
                {nonePets}
            </div>

        )
    }
}

const mapStateToProps = state =>{
    return{
      id: state.userId,
      userPets: state.userPets,
      needToFetch: state.needToFetch
    }
  };

const mapDispatchToProps = dispatch =>{
    return{
      fetchPets:(id,needToFetch)=>dispatch(fetchUserPetsAsync(id,needToFetch)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (MyPets);