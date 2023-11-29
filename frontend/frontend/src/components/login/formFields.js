import React from 'react'
import "../forms.css";

const TextInputField = ({naziv, name, value, method}) =>{
    return(
        <div className="input-div">
        <div className="input-text-form">{naziv}:</div>
            <input className="input-form" type='text' name={name} value={value} 
                onChange={method} />
        </div>
    );
}
const EmailInputField = ({naziv, name, value, method}) =>{
    return(
        <div className="input-div">
        <div className="input-text-form">{naziv}:</div>
            <input className="input-form" type='email' name={name} value={value} 
                onChange={method} />
        </div>
    );
}
const PassInputField = ({naziv, name, value, method}) =>{
    return(
        <div className="input-div">
        <div className="input-text-form">{naziv}:</div>
            <input className="input-form" type='password' name={name} value={value} 
                onChange={method} />
        </div>
    );
}



export {TextInputField, EmailInputField, PassInputField,  };