import React from "react";
import "./Pocetna.css";
import image from "../slike/pocetna_pozadina.jpg";
import {Button} from "react-bootstrap";

function Pocetna() {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 633,
        marginTop: 0,
      }}
    >
      
      <div className="bubble">
        <div className="bubble-text">
        <h1>Dobro došli u kuharicu!</h1>
        </div>
        <div ><a href="/login"><Button className="bubble-button1">Log in / Sign up</Button> </a>
        
       
        </div>
       

      </div>
    </div>
  );
}

export default Pocetna;
