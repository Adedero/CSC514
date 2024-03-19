const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    dateOfBirth: Date,
    username: String,
    phoneNumber: String,
    customerId: String,
    accountNumber: String,
    password: String
})



module.exports = mongoose.model('Customer', CustomerSchema)