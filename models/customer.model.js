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
    password: String,
    regNumber: Number,
    serialNumber: Number,
})



module.exports = mongoose.model('Customer', CustomerSchema)