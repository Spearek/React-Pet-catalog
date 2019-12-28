import React from 'react';

const tag = props => {

    const tagStyle={
        color:'red',
        fontSize:'10px',
        border: '1px solid black', 
        height: '20px',
        padding: '0 10px',
        lineHeight: '200%',
        margin:'0 5px'  
    }
    const spanStyle={
        fontSize:'12px',
        fontWeight:'bold',
        width:'13px',
        height:'13px',
        display:'block',
        backgroundColor:'red',
        lineHeight:'90%',
        color:'white',
        position:'absolute',
        borderRadius:'50%',
        right:'0',
        top:'-5px',
        cursor:'pointer'

    }
    const containerStyles={
        position:'relative'
    }

    return(
        <div style={containerStyles}>
            <p style={tagStyle}>{props.foodName}</p>
            <span style={spanStyle} onClick={props.remove}>x</span>
        </div>
    
    )
}

export default tag;