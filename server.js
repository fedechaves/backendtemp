const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const cors = require('cors')
const { response } = require('express')
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'star-wars-quotes',
    collection 

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('connected to database')
        db= client.db(dbName)
        collection = db.collection('quotes')
    })

//CALL MIDDLEWARES
app.set('view engine', 'ejs') //templating,  generate html
app.use(express.static('public')) //to access public folder
app.use(express.urlencoded({extended: true })) // helping parse urls
app.use(express.json())// help express parse json files
app.use(cors())

app.get('/', async (req,res) => {
    try {
        res.render('index.ejs')

    } catch(error){
    response.status(500).send({message: error.message})
    
    }

})



//CREATE PORT
app.listen(process.env.PORT || PORT, () => { 
    console.log(`server running on ${PORT} juju`)
})

