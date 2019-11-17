import React from 'react';
import Popup from "reactjs-popup";

const modal = () => (
    <Popup
      trigger={<img src={require("../../assets/photoshop slices/plus.png")}/>}
      modal
      closeOnDocumentClick
    >
      <span> Example Content </span>
    </Popup>
  );

  export default modal;