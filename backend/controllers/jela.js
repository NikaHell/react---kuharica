const jelaRouter = require('express').Router()
const Jela = require('../models/jelo')
const Korisnik = require('../models/korisnik')
const jwt = require('jsonwebtoken')

const dohvatiToken = (req) => {
    const auth = req.get('Authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        return auth.substring(7)
    }
    return null
}

jelaRouter.get('/', async (req, res) => {
    const jela = await Jela.find({})
    .populate('korisnik', { username: 1, ime: 1, email: 1 })
    
    res.json(jela)
})

jelaRouter.get('/:id', async (req, res) => {
    const jela = await Jela.findById(req.params.id)
    .populate('korisnik', { username: 1, ime: 1, email: 1 })
    
    res.json(jela)
})

jelaRouter.post('/', async (req, res) => {
    const podatak = req.body
    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "Neispravni token" }).end()
    }
    const autor = await Korisnik.findById(dekToken.id)
    const novoJelo = new Jela({
        ime: podatak.ime,
        kategorija: podatak.kategorija,
        sastojci: podatak.sastojci,
        opis: podatak.opis,
        korisnik: autor._id
    })

    const spremljenoJelo = await novoJelo.save()
    autor.jela = autor.jela.concat(spremljenoJelo._id)
    await autor.save()
    res.json(spremljenoJelo)
})

jelaRouter.put('/:id', async (req, res) => {
    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "Neispravni token" })
    }
    
    const podatak = req.body
    const id = req.params.id
    let jeloZaMijenjanje = await Jela.findById(req.params.id)
    let autor = jeloZaMijenjanje.korisnik._id.toString()
    
    const jelo = {
      ime: podatak.ime,
      kategorija: podatak.kategorija,
      sastojci: podatak.sastojci,
      opis: podatak.opis,
      
    }

    if (autor === dekToken.id) {
        const novoJelo = await Jela.findByIdAndUpdate(id, jelo, { new: true })
        return res.json(novoJelo) 
    }else{
        return res.status(401).json({ error: "Neispravni token" }).end()
    }
})

jelaRouter.delete('/:id', async (req, res) => {
    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "Neispravni token" })
    }
    
    let jeloZaBrisanje = await Jela.findById(req.params.id)
    let autor = jeloZaBrisanje.korisnik._id.toString()

    if (autor === dekToken.id || dekToken.uloga === 'admin' || dekToken.uloga ==='masteradmin') {
        await Korisnik.findByIdAndUpdate(autor, 
        {$pull: {jela : req.params.id}})
        await Jela.findByIdAndRemove(req.params.id)
        return res.status(204).end()
    } else {
        return res.status(401).json({ error: "Neispravni token" }).end()
    }
})
jelaRouter.delete('/visestruko/:id', async (req, res) => {
    const token = dohvatiToken(req)
    const dekToken = jwt.verify(token, process.env.SECRET)
    if (!token || !dekToken.id) {
        return res.status(401).json({ error: "Neispravni token" })
    }
    let autor = req.params.id
    if (autor === dekToken.id || dekToken.uloga === 'admin' || dekToken.uloga ==='masteradmin') {
        await Jela.deleteMany({ 'korisnik': autor })
        return res.status(204).end()
    } else {
        return res.status(401).json({ error: "Neispravni token" }).end()
    }
})

module.exports = jelaRouter