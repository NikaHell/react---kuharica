const mongoose = require('mongoose')

const porukaSchema = new mongoose.Schema({
 naziv: String,
 sastojci: String,
 recept: String
})
porukaSchema.set('toJSON', {
    transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
    }
    })
    
const Poruka = mongoose.model('Poruka', porukaSchema, 'poruke')