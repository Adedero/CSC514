require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const users = require('./paid')
const User = require('./models/user.model')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database connection established')
    })
    .catch((err) => console.error(err));

async function addUsers() {
    for (let user of users) {
        const existingUser = await User.findOne({ name: user.name })
        if (!existingUser) {
            await User.create({ name: user.name.toUpperCase() })
        }
    }
}

addUsers()

const app = express();
app.use(express.urlencoded({ extended: true }));

//Middleware
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/auth', require('./routes/auth.routes'))

app.get('/', (req, res) => {
    res.render('index', { message: null });
});

app.get('/login', (req, res) => {
    res.render('login', { message: null });
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});

