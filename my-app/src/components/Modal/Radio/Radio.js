import React from 'react';

const radio = props =>{


    return(
        <label>
            <input type="radio" value="" name="species"/>
            LabelName
        </label>

        

    )
}

export default radio;





/*div className="radioContainer">
<input type="radio" value={props.species[0]} name="species" defaultChecked={true}/>
<label for={props.species[0]}>Kot</label>
<input type="radio" value={props.species[1]} name="species"/>
<label for={props.species[1]}>Pies</label>
<input type="radio" value={props.species[2]} name="species"/>  
<label for={props.species[2]}>Gryzoń</label>
</div>*/