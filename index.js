require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Customer = require('./models/customer.model')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database connection established')
    })
    .catch((err) => console.error(err));


const app = express();
app.use(express.urlencoded({ extended: true }));

//Middleware
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/auth', require('./routes/auth.routes'))


app.get('/', (req, res) => {
    res.render('index', { message: null });
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/print', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.render('print', { customers: customers });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

app.get('/names', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.render('names', { customers: customers });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});

