import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const Jela = ({ id, ime, kategorija, sastojci,
     korisnik, brisi,  ispis }) => {
    const preusmjeri=useNavigate()


    const prikaziDetalje = () => {
        preusmjeri(`/detalji/${id}`)
        window.location.reload()
    }
    
    return (
        <tr>
            <td>{ime}</td>
            <td>{kategorija}</td>
            
            
            <td><Button className='Detalji' variant="primary" onClick={prikaziDetalje}>Detalji</Button></td>
           
        </tr>
    );
}
export default Jela;