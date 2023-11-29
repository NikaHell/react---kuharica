import React, { useState, useEffect } from "react";
import { Modal, ModalFooter } from 'react-bootstrap';
import jelaAkcije from '../../services/jela'
import { useNavigate } from "react-router-dom";
import FormaJela from './formaJela';
const UrediJelo = ({ handleClose, show, id }) => {
  const [ime, postaviNaziv] = useState('')
  const [kategorija, postaviKat] = useState('')
  const [sastojci, postaviSastojke] = useState('')
  const [opis, postaviOpis] = useState('')
  const navigacija = useNavigate()
 
  const changeJelo = async (j) => {
    j.preventDefault()
    try {
      const logiraniKorisnikJSON = window.localStorage.getItem(
        "Prijavljeni korisnik"
      );
      if (logiraniKorisnikJSON) {
        const korisnik = JSON.parse(logiraniKorisnikJSON);
        jelaAkcije.postaviToken(korisnik.token);
      }
     
      const novoJelo = await jelaAkcije.osvjezi(id.toString(), {
        ime, kategorija,sastojci, opis
      })
      navigacija(0)
    } catch {
      alert('Neispravni podaci')
    }
  }
  const postaviParametre = (ime, kategorija, sastojci,opis) => {
    postaviNaziv(ime)
    postaviKat(kategorija)
    postaviSastojke(sastojci)
    postaviOpis(opis)
  }
  useEffect(() => {
    jelaAkcije.dohvatiJendog(id)
      .then(res => postaviParametre(res.data.ime, res.data.kategorija, res.data.sastojci,
         res.data.opis))
  }, []);
  return (
    <div>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <FormaJela naslov="Promjeni svoje Jelo!" metoda={changeJelo}
            ime={ime} promjenaNaziva={({ target }) => postaviNaziv(target.value)}
            kategorija={kategorija} promjenaKategorije={({ target }) => postaviKat(target.value)}
            sastojci={sastojci} promjenaSastojaka={({ target }) => postaviSastojke(target.value)}            
            opis={opis} promjenaOpisa={({ target }) => postaviOpis(target.value)}
            gumb={"Promijeni"}
          />
        </Modal.Body>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default UrediJelo;