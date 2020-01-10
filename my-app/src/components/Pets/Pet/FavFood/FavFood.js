import React from 'react';

const favFood = props => {

const styles = {
    display: 'inline',
    border: '1px solid black',
    padding: '2px',
    fontSize: '14px',
    margin: '5px 10px'
}

    return <p style={styles}>{props.favorite}</p>
    
}

export default favFood;