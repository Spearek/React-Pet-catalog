import React, {useEffect} from 'react';
import  {connect} from 'react-redux';
import  * as actions from '../../store/actions/index';

import Pets from '../Pets/Pets';


const MyPets = props => {
  

  useEffect(()=>{
    props.fetchPets(props.id,props.needToFetch);
  },[])


  const removePetHandler = (petId) =>{
    props.removePet(petId,props.id,props.userPets,props.token)
  }

  let nonePets = null;

  if((props.userPets) && (props.userPets.length < 1)){
      nonePets = <p style={{fontSize:'22px',fontWeight:'600',color:'red', marginTop:'10%'}}>Nie masz jeszcze żadnych dodanych zwierzaków.</p>;
  }


  return(
      <div>
        <h2>Lista dodanych Zwierzaków. </h2>
        <p>Poniżej znajduje się lista dodanych przez Ciebie zwierzaków.</p>
        <p>W każdej chwili możesz usunąć wybranego zwierzaka z aplikacji klikając na <span style={{color:'white',fontSize:'16px',marginTop:'10px',display:'inline-block',fontWeight:'600',background:'red',padding:'5px 15px',borderRadius:'5px'}}>X</span></p>
        <Pets
          petList={props.userPets}
          userId={props.id}
          visiblity='default'
          click={removePetHandler}
          myPetsSection
        />
        {nonePets}
      </div>

  )
}

const mapStateToProps = state =>{
    return{
      id: state.userId,
      userPets: state.userPets,
      token: state.token,
      needToFetch: state.needToFetch
    }
  };

const mapDispatchToProps = dispatch =>{
    return{
      fetchPets:(id,needToFetch)=>dispatch(actions.fetchUserPetsAsync(id,needToFetch)),
      removePet:(petId,userId,userPets,token)=>dispatch(actions.petRemovalAsync(petId,userId,userPets,token))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (MyPets);