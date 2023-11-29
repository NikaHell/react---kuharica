const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const jelo = require("../models/jelo");
const pomocni = require("./pomocni_za_test");
const Korisnik = require('../models/korisnik')
const api = supertest(app);
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await jelo.deleteMany({});
  let novojelo = new jelo(pomocni.jelaPocetne[0]);
  await novojelo.save();
  novojelo = new jelo(pomocni.jelaPocetne[1]);
  await novojelo.save();
  novojelo = new jelo(pomocni.jelaPocetne[2]);
  await novojelo.save();
  novojelo = new jelo(pomocni.jelaPocetne[3]);
  await novojelo.save();

  
  await Korisnik.deleteMany({})
  const passHash = await bcrypt.hash('tajna', 10)
  const korisnik = new Korisnik({ username: 'testni',ime: 'pocetniTestini', email: "testni@email.com", uloga: "admin", passHash})
  const korisnik2 = new Korisnik({ username: 'testni2',ime: 'pocetniTestini2', email: "testni2@email.com", uloga: "korisnik", passHash})
  await korisnik.save()
  await korisnik2.save()
});
//testovi
test("Jela se vraćaju u JSON formatu", async () => {
  await api
    .get("/api/jela")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test('Dohvacanje svih eventa', async () => {
  const odgovor = await api
                  .get('/api/jela')
                  .expect(200)
                  .expect('Content-Type', /application\/json/)
  expect(odgovor.body).toHaveLength(4)
})

test('Dohvacanje jednog eventa', async () => {
  const jelaPocetak = await pomocni.jelaBaze()
  const JelaZaDohvacanje = jelaPocetak[1]

  const odgovor = await api
                  .get(`/api/jela/${JelaZaDohvacanje.id}`)
                  .expect(200)
                  .expect('Content-Type', /application\/json/)
  expect( odgovor.body.kategorija).toContain('String')
})

test("dodavanje ispravnog jela", async () => {
  let token = null;
  const podaciLogin = {
    username: "testni2",
    pass: "tajna",
  };
  await api
    .post("/api/login/")
    .send(podaciLogin)
    .expect("Content-Type", /application\/json/)
    .expect((res) => (token = res._body.token));

  const novaJela = {
    //pazi na tipove podatka i vrijednosti
    ime: "Ražnjići s tofuom i povrćem",
    kategorija: "Vegetarijansko",
    sastojci:
      "30 g sušenih rajčica (u ulju),1 manja glavica ljubičastog luka,1 žlica nasjeckanih listića peršina,1 žličica listića timijana,4 žlice ulja,sol, papar,12 malih kobasica od tofua,po ½ žute i crvene paprike,1 tikvica,4 šampinjona",
    opis: "Za marinadu najprije nasitno nasjeckajte rajčice i luk. Pomiješajte sa začinskim biljem i uljem te začinite solju i paprom. Prerežite poprijeko kobasice. Narežite povrće i gljive na komade. Sve nabodite na čačkalice, stavite u marinadu, poklopite i ostavite 30 minuta da se marinira. Pecite na roštilju uz okretanje 8-10 minuta te nakapajte marinadom. Poslužite s kuhanom rižom ili krumpirom.",
  };

  await api
    .post("/api/jela")
    .set({ Authorization: `bearer ${token}` })
    .send(novaJela)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const jelaNaKraju = await pomocni.jelaBaze();
  expect(jelaNaKraju).toHaveLength(pomocni.jelaPocetne.length + 1);
  const kategorija = jelaNaKraju.map((j) => j.kategorija);
  expect(kategorija).toContain("Vegetarijansko");
});

test('uspjesno mijenjanje eventa', async () => {
  let token = null
  const podaciLogin = {
      username: "testni2",
      pass: "tajna"
  }
  await api
  .post('/api/login/')
  .send(podaciLogin)
  .expect('Content-Type', /application\/json/)
  .expect((res) => token = res._body.token)
  
  let idNovi= null
  const novoJelo = {
    ime: "Ražnjići s tofuom i povrćem",
    kategorija: "Vegetarijansko",
    sastojci:
      "30 g sušenih rajčica (u ulju),1 manja glavica ljubičastog luka,1 žlica nasjeckanih listića peršina,1 žličica listića timijana,4 žlice ulja,sol, papar,12 malih kobasica od tofua,po ½ žute i crvene paprike,1 tikvica,4 šampinjona",
    opis: "Za marinadu najprije nasitno nasjeckajte rajčice i luk. Pomiješajte sa začinskim biljem i uljem te začinite solju i paprom. Prerežite poprijeko kobasice. Narežite povrće i gljive na komade. Sve nabodite na čačkalice, stavite u marinadu, poklopite i ostavite 30 minuta da se marinira. Pecite na roštilju uz okretanje 8-10 minuta te nakapajte marinadom. Poslužite s kuhanom rižom ili krumpirom.",
  
  }
  
  await api
  .post('/api/jela')
  .set({ Authorization: `bearer ${token}` })
  .send(novoJelo)
  .expect(res => idNovi = res.body.id)

  const jeloEdit = {
      kategorija:"Vegansko"
  }

  await api
  .put(`/api/jela/${idNovi}`)
  .set({ Authorization: `bearer ${token}` })
  .send(jeloEdit)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  const JelaNaKraju = await pomocni.jelaBaze()
  const kategorija = JelaNaKraju.map(j => j.kategorija)
  expect(kategorija).toContain("Vegansko")
})

test('ispravno brisanje jela', async () => {
  let token = null
  const podaciLogin = {
      username: "testni2",
      pass: "tajna"
  }
  await api
  .post('/api/login/')
  .send(podaciLogin)
  .expect('Content-Type', /application\/json/)
  .expect((res) => token = res._body.token)
  
  let idNovi= null
  const novoJelo = {
    ime: "Ražnjići s tofuom i povrćem",
    kategorija: "Vegetarijansko",
    sastojci:
      "30 g sušenih rajčica (u ulju),1 manja glavica ljubičastog luka,1 žlica nasjeckanih listića peršina,1 žličica listića timijana,4 žlice ulja,sol, papar,12 malih kobasica od tofua,po ½ žute i crvene paprike,1 tikvica,4 šampinjona",
    opis: "Za marinadu najprije nasitno nasjeckajte rajčice i luk. Pomiješajte sa začinskim biljem i uljem te začinite solju i paprom. Prerežite poprijeko kobasice. Narežite povrće i gljive na komade. Sve nabodite na čačkalice, stavite u marinadu, poklopite i ostavite 30 minuta da se marinira. Pecite na roštilju uz okretanje 8-10 minuta te nakapajte marinadom. Poslužite s kuhanom rižom ili krumpirom.",
  
  }
  
  await api
  .post('/api/jela')
  .set({ Authorization: `bearer ${token}` })
  .send(novoJelo)
  .expect(res => idNovi = res.body.id)

  const JelaPocetak = await pomocni.jelaBaze()
  const odgovor = await api
  .delete(`/api/jela/${idNovi}`)
  .set({ Authorization: `bearer ${token}` })
  .expect(204)
  const JelaKraj = await pomocni.jelaBaze()
  expect(JelaKraj).toHaveLength(JelaPocetak.length - 1)
  const ime = JelaKraj.map(ev => ev.ime)
  expect(ime).not.toContain(novoJelo.ime)
})

afterAll(() => {
  mongoose.connection.close();
});
