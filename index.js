require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const users = require('./paid')
const User = require('./models/user.model')

const names = "NJOKU NWANKA CHIBUZOR OKWARA MMASICHUKWU OHERI"
const namesArray = names.split(" ")
let obj = {}
function addNames() {
    for (let name of namesArray) {
        obj.name = name
        users.push(obj)
    }
}

addNames()
async function addUsers() {
    for (let user of users) {
        const existingUser = await User.findOne({ name: user.name })
        if (!existingUser) {
            await User.create({ name: user.name.toUpperCase() })
        }
    }
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        addUsers()
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
});

app.get('/login', (req, res) => {
    res.render('login', { message: null });
})
app.get('/register', (req, res) => {
    res.render('register', { isAuthenticated: false });
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});

