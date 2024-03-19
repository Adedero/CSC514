const express = require('express');
const router = express.Router();

const User = require('../models/user.model')
const Customer = require('../models/customer.model')

router.post('/register', async(req, res) => {
    //const fullName = `${req.body.firstName}${req.body.lastName}`
    try {
        /* const user = await User.findOne({
            name: { $regex: fullName, $options: 'i' }
        })
        if (!user) {
            return res.render('/', { message: 'You think say you wise abi? Go and pay the N1000' })
        } */
        const customer = new Customer(req.body)
        await customer.save()
        return res.render('login', { message: 'Please log in.' })
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.post('/login', async(req, res) => {
    try {
        const customer = await Customer.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if (customer) {
            return res.render('home', {customer})
        } else {
            return res.render('login', {
                message: 'Wrong username or password'
            })
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/payments', async(req, res) => {
    const value = req.body.name.trim().toUpperCase()
    try {
        const user = await User.findOne({ name: value })
        if (!user) {
            return res.status(404).redirect('/', {
                message: 'No paid user with this name exists. Have you paid your N1000?'
            })
        }

        return res.redirect('/register')
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
})
module.exports = router