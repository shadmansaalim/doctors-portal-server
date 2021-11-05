const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2eq37.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("doctors_portal");
        const appointmentsCollection = database.collection("appointments");


        app.get('/appointments', async (req, res) => {
            const email = req.query.email;
            const date = req.query.date;
            const query = { email: email, date: date }
            const cursor = appointmentsCollection.find(query);
            const appointments = await cursor.toArray();
            console.log(appointments);
            res.json(appointments);
        })


        app.post('/appointments', async (req, res) => {
            const appointment = req.body;
            const result = await appointmentsCollection.insertOne(appointment);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Doctors Portal Server');
})

app.listen(port, () => {
    console.log('Listening to port ', port);
})