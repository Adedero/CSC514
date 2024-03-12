const mongoose = require('mongoose')
const randomstring = require('randomstring');

const StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    phoneNumber: String,
    parentName: String,
    parentNumber: String,
    parentAddress: String,
    studentId: String,
    password: String
})

function generateShortStudentId() {
  const numbers = randomstring.generate({ length: 4, charset: 'numeric' });

  const letters = randomstring.generate({ length: 2, charset: 'alphabetic' });

  return `${numbers}${letters.toUpperCase()}`;
}

StudentSchema.pre('save', function (next) {

    this.studentId = generateShortStudentId();
    
    this.password = this.studentId;

    next();
});

module.exports = mongoose.model('Student', StudentSchema)