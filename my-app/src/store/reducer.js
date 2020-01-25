import * as actionTypes from './actions/actionTypes';

const initialState = {
    pets: null,
    speciesList: ["Cat","Dog","Rodent"]
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.STORE_PETS:
            return{
                ...state,
                pets:action.newPets
            }

        case actionTypes.LOCAL_PET_REMOVAL:
            const newPetArr = JSON.parse(JSON.stringify(state.pets));
            const petPosition = newPetArr.findIndex((el)=>{
                return el.id === action.petId
            });
            newPetArr.splice(petPosition,1);
            return{
                ...state,
                pets:newPetArr
            }

        default: return state;
    }
};

export default reducer;