import React from "react";

export const DeleteBtn = props =>
  <button {...props} 
    style={{backgroundColor: "rgb(231,175,95)", border: "none"}} 
    className="btn btn-danger deleteRec"
  >
    {props.children}
  </button>;