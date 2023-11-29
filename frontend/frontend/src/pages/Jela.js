import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../components/style.css";
import JelaAkcije from "../services/jela";
import korisniciAkcije from "../services/korisnici";
import Jelo from "../components/jela/jela";

const Jela = () => {
const [jela, postaviJela] = useState([]);
 const [ispisiSve, postaviIspis] = useState(null)
  const [unos, postaviUnos] = useState("");
  const [korisnik, postaviKorisnika] = useState(null);
  const [kor, postaviautora] = useState(null);
 
 const JelaZaIspis = ispisiSve ?
    jela
    : jela.filter(j => j.ime.toLowerCase().includes(unos.toLowerCase()) ||
          j.kategorija.toLowerCase().includes(unos.toLowerCase()) ||
          j.sastojci.toLowerCase().includes(unos.toLowerCase())
      );
  const promjenaUnosa = (e) => {
    postaviUnos(e.target.value);
  };
  const brisi = (id) => {
    JelaAkcije.brisi(id).then((response) => {
      postaviJela(jela.filter((t) => t.id !== id));
    });
  };
  useEffect(() => {
    const logiraniKorisnikJSON = window.localStorage.getItem(
      "Prijavljeni korisnik"
    );
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON);
      postaviKorisnika(korisnik);
      JelaAkcije.postaviToken(korisnik.token);
      korisniciAkcije
        .dohvatiJednog(korisnik.username)
        .then((res) => postaviautora(res.data));
    }
  }, []);
  useEffect(() => {
    JelaAkcije.dohvatiSve()
    .then(res => postaviJela(res.data));
  }, []);
  return (
    <div>
     <div className="search-div">
        <input
          className="search-element"
          type="search"
          value={unos}
          placeholder=" ⌕ "
          onChange={promjenaUnosa}
        ></input>
      </div>
      <Table striped hover className="table-cont">
        <thead>
          <tr>
            <th>Naziv</th>
            <th>kategorija</th>
          </tr>
        </thead>
        <tbody>
          {JelaZaIspis.map(t => (
            <Jelo
              key={t.id}
              id={t.id}
              ime={t.ime}
              kategorija={t.kategorija}
              sastojci={t.sastojci}
              opis={t.opis}
              
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Jela;
