const Jelo = require("../models/jelo");
const Korisnik = require("../models/korisnik")
const jelaPocetne = [
  {
    ime: "String",
    kategorija: "String",
    sastojci: "String",
    opis: "String",
  },
  {
    ime: "String",
    kategorija: "String",
    sastojci: "String",
    opis: "String",
  },
  {
    ime: "String",
    kategorija: "String",
    sastojci: "String",
    opis: "String",
  },
  {
    ime: "String",
    kategorija: "String",
    sastojci: "String",
    opis: "String",
  },
  //naslagivanje dalje
];
const jelaBaze = async () => {
  const jelo = await Jelo.find({});
  return jelo.map((p) => p.toJSON());
};
const korisnikBaza = async () => {
  const korisnici = await Korisnik.find({})
  return korisnici.map(k => k.toJSON())
}


module.exports = { jelaPocetne, jelaBaze , korisnikBaza};
