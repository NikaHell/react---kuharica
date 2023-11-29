import React, { useState, useEffect } from "react";
import {Button} from "react-bootstrap";

import JelaAkcije from "../services/jela";
import korisniciAkcije from "../services/korisnici";


import "../components/style.css";
import "../components/buttons.css";


const Profil = ({ props }) => {
  const [korIme, postaviKorIme] = useState("");
  const [ime, postaviIme] = useState("");
  const [email, postaviEmail] = useState("");
  const [id, postaviId] = useState("");
  const [uloga, postavIulogu] = useState("");
  const [korisnik, postaviKorisnika] = useState(null);

  const postaviPodatke = (korIme, ime, email, id, uloga) => {
    postaviKorIme(korIme);
    postaviIme(ime);
    postaviEmail(email);
    postaviId(id);
    postavIulogu(uloga);
  };
  

  useEffect(() => {
    const logiraniKorisnikJSON = window.localStorage.getItem(
      "Prijavljeni korisnik"
    );
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON);
      postaviKorisnika(korisnik);
      korisniciAkcije.postaviToken(korisnik.token);
      JelaAkcije.postaviToken(korisnik.token);

      korisniciAkcije
        .dohvatiJednog(korisnik.username)
        .then((res) =>
          postaviPodatke(
            res.data.username,
            res.data.ime,
            res.data.email,
            res.data.id,
            res.data.uloga
          )
        );
    }
  }, []);
  return (<div>
    <div className="podaci-balon">
        <div className="pod">
      <div>Korisničko ime:  {korIme}</div>
      <div>Ime : {ime}</div>
      <div>E-mail : {email}</div>
      <a href='/dodaj' ><Button className="dodaj">Dodaj</Button></a>
    </div>
    
    </div>
    
    
    </div>
    
  );
};

export default Profil;
