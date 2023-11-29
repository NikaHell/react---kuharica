const mongoose = require('mongoose')

const korisnikSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    ime: {
        type: String,
        required: true
    },   
    
    email: {
        type: String,
        required: true
    },
    passHash: String,
    uloga: {
        type: String,
        required:true
    },
    jela:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jelo'
        }
    ]
    
})
korisnikSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passHash
        return ret
    }
})

const Korisnik = mongoose.model('Korisnik', korisnikSchema, 'korisnici')

module.exports = Korisnik