const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${processe.env.DB_PASS}@cluster0.2eq37.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });








app.get('/', (req, res) => {
    res.send('Doctors Portal Server');
})

app.listen(port, () => {
    console.log('Listening to port ', port);
})