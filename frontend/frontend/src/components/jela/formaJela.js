import React from 'react'
import "../forms.css";
import "../buttons.css"
import {TextInputField} from '../login/formFields';

const FormaJela = ({naslov, metoda, ime, promjenaNaziva, Kategorija, promjenaKat, Sastojci, 
    promjenaSastojaka, opis, promjenaOpisa,gumb}) => {

        return(
            <form onSubmit={metoda} style={{boxShadow: 'none'}}>
                <h3 className='naslov'>{naslov}</h3>
                <TextInputField naziv={"Naziv"} name={'Naziv'} value={ime} method={promjenaNaziva} /> 
                <TextInputField naziv={"Kategorija"} name={'Kategorija'} value={Kategorija} method={promjenaKat} />               
                <TextInputField naziv={"Sastojci"} name={"Sastojci"} value={Sastojci} method={promjenaSastojaka} />               
                <TextInputField naziv={"Opis"} name={'Opis'} value={opis} method={promjenaOpisa} />
                <button className="btn-fullsize" type='submit' href='/'> {gumb} </button>
            </form>
            
    );
    
}

export default FormaJela;