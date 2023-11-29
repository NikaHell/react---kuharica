require('dotenv').config()
const PORT = process.env.PORT
const password = process.env.ATLAS_PASS
const user = process.env.ATLAS_USER
const DB_URI =  `mongodb+srv://${user}:${password}@okviri.v13xnal.mongodb.net/?retryWrites=true&w=majority`
const dbname = process.env.NODE_ENV === 'test' ? 'jela-api-test':'jela-api'
module.exports = {PORT, DB_URI}