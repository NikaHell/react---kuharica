import React, { useState, useEffect } from "react";
import "../style.css";
import '../buttons.css'
import jelaAkcije from '../../services/jela';
import { useParams , useNavigate} from "react-router-dom";
import UrediJelo from './editJelo';

const Detalji = ({ props }) => {
    let { id } = useParams();
    const [korisnik, postaviKorisnikaGlob] = useState(null)
    const [ime, postaviNaziv] = useState("")
    const [kategorija, postaviKat] = useState("")
    const [sastojci, postaviSastojke] = useState("")
    const[show,setShow]= useState(false)

    const [opis, postaviOpis] = useState("")
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postaviParametre = (ime, kategorija, sastojci, opis) => {
        postaviNaziv(ime)
        postaviKat(kategorija)
        postaviSastojke(sastojci)
        postaviOpis(opis)
        
    }
    const navigiraj = useNavigate()
    const brisi = (id) => {
        let akcija = "NE";
        if (window.confirm("Jeste li sigurni da želite izbrisati jelo?")) {
            akcija = "DA";
        } else {
            akcija = "NE";
        }
        if (akcija === "DA") {
            
            
            jelaAkcije.brisi(id)
            alert("Vaše jelo je uspješno izbrisan!")
            window.localStorage.clear()
            navigiraj(0);
        } else {
            return;
        }
    }
    
 
    useEffect(() => {
        const logiraniKorisnikJSON = window.localStorage.getItem(
            "Prijavljeni korisnik"
        );
        if (logiraniKorisnikJSON) {
            const korisnik = JSON.parse(logiraniKorisnikJSON);
            postaviKorisnikaGlob(korisnik);
            jelaAkcije.postaviToken(korisnik.token)
            
           
        }
        jelaAkcije.dohvatiJendog(id)
        .then(res => postaviParametre(res.data.ime, res.data.kategorija, res.data.sastojci,
            res.data.opis))
    }, []);
    return (
        <div>
            <div className='okvir'>
                <div className="prozor">
                <div className="header"> {ime} </div>
                    <div className="tekst">Kategorija: {kategorija} </div>
                    <div className="tekst">Sastojci: {sastojci} </div>
                    <div className="tekst">Opis: {opis} </div>
                    

                    <button onClick={handleShow}>Uredi</button>
                    <UrediJelo show={show} handleShow={handleShow} handleClose={handleClose} id={id} />
                    <button className='btn-clear' onClick={() => brisi(id)}>Obriši korisnički račun</button>
                    
                </div>
            </div>
            
            
        </div>
    );
}

export default Detalji;