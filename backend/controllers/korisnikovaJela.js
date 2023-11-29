const korisnikovaJela = require('express').Router()
const Jelo = require('../models/jelo')
const Korisnik = require('../models/korisnik')
const jwt = require('jsonwebtoken')

const dohvatiToken = (req) => {
    const auth = req.get('Authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

//dohvat svih korisnikovih jela
korisnikovaJela.get('/', async (req, res) => {
    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "Neispravni token" })
    }
    const jela = await Jelo.find({ 'autor.korisnik': dekToken.id })
        .populate('korisnik', { username: 1, ime: 1, email: 1 })
        .populate('autor.korisnik', { username: 1, ime: 1, email: 1 })
    res.json(jela)

})


//dohvat jednog korisnikovog jela
korisnikovaJela.get('/:id/:prid', async (req, res) => {
    const jelo = await jelo.findById(req.params.id)
    const recept = jelo.autor
    const odredeni = recept.find(el => el._id.toString() === req.params.prid)
    res.json(odredeni)

})

module.exports = korisnikovaJela