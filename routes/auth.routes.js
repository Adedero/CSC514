const express = require('express');
const router = express.Router();

const Student = require('../models/student.model')

router.post('/register', async(req, res) => {
    try {
        const student = new Student(req.body)
        await student.save()
        res.render('success', {
            studentId: student.studentId,
            password: student.password 
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/login', async(req, res) => {
    try {
        const student = await Student.findOne({
            studentId: req.body.studentId,
            password: req.body.password
        })
        if (student) {
            res.render('home', {
                student: {
                    firstName: student.firstName,
                    lastName: student.lastName,
                    studentId: student.studentId
                }
            })
        } else {
            res.render('index', {
                message: 'Wrong username or password'
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router