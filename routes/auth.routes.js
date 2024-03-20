const express = require('express');
const router = express.Router();

const Customer = require('../models/customer.model')

router.post('/register', async(req, res) => {
    try {
        const customer = new Customer(req.body)
        await customer.save()
        res.render('index', { message: 'Please log in.' })
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/login', async(req, res) => {
    try {
        const customer = await Customer.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if (customer) {
            res.render('home', { customer })
            return
        } else {
            res.render('index', {
                message: 'Wrong username or password'
            })
            return
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router