const mongoose = require("mongoose");

const jeloSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: true,
  },
  kategorija: {
    type: String,
    required: true,
  },
  sastojci: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true
},
  
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Korisnik'
},


});
jeloSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
   
    return ret;
  },
});

const jelo = mongoose.model("Jelo", jeloSchema, "jela");

module.exports = jelo;
