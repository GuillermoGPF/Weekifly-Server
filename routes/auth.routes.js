const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.middleware')
const saltRounds = 10

router.post('/signup', (req, res) => {
    const { email, password, username } = req.body

    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: 'Introduce tu email, contraseña, nombre de usuario y elige tu avatar' })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Introduce un email válido' })
        return
    }

    if (password.length < 2) {
        res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres y contener al menos un número, una minúscula y una letra mayúscula' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: 'El nombre de usuario ya existe' })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username })
        })
        .then((createdUser) => {
            const { email, username, _id } = createdUser
            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error interno' })
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Introduce un email y contraseñas válidos' })
        return
    }

    User
        .findOne({ email })
        .populate('friends')
        .populate('plans')
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: 'No se encuentra el nombre de usuario' })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { _id, email, username, avatar, friends, plans } = foundUser
                
                const payload = { _id, email, username, avatar, friends, plans}
                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )
                res.status(200).json({ authToken })
            } else {
                res.status(401).json({ message: 'No coincide la contraseña' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error interno' })
        })
})

router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})


module.exports = router