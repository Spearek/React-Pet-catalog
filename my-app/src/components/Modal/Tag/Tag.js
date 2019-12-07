import React from 'react';

const tag = props => {

    const tagStyle={
        color:'red',
        fontSize:'10px',
        border: '1px solid black', 
        height: '20px',
        padding: '0 5px',
        lineHeight: '200%',
        margin:'0 5px'  
    }

    return(
        <p style={tagStyle}>example</p>
    )
}

export default tag;