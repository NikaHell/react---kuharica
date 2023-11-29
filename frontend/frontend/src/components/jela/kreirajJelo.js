import React, { useState } from "react";
import jelaAkcije from "../../services/jela";
import { useNavigate } from "react-router-dom";
import FormaJela from "./formaJela";

const KreiraJelo = ({ handleClose, show }) => {
  const [ime, postaviNaziv] = useState("");
  const [kategorija, postaviKat] = useState("");
  const [sastojci, postaviSastojke] = useState("");
  const [opis, postaviOpis] = useState("");
  const navigacija = useNavigate();

  const createJelo = async (j) => {
    j.preventDefault();
    try {
      const logiraniKorisnikJSON = window.localStorage.getItem(
        "Prijavljeni korisnik"
      );
      if (logiraniKorisnikJSON) {
        const korisnik = JSON.parse(logiraniKorisnikJSON);
        jelaAkcije.postaviToken(korisnik.token);
      }

      const novoJelo = await jelaAkcije.stvori({
        ime,
        kategorija,
        sastojci,
        opis,
      });
      navigacija(0);
    } catch {
      alert("Neispravni podaci");
    }
  };
  return (
    <div>
      <FormaJela
        naslov="Kreiraj svoje jelo!"
        metoda={createJelo}
        naziv={ime} promjenaNaziva={({ target }) => postaviNaziv(target.value)}
        kategorije={kategorija} promjenaKat={({ target }) => postaviKat(target.value.toString())}
        sastojci={sastojci} promjenaSastojaka={({ target }) => postaviSastojke(target.value)}
        opis={opis} promjenaOpisa={({ target }) => postaviOpis(target.value)}
        gumb={"Kreiraj"}
      />
    </div>
  );
};

export default KreiraJelo;
