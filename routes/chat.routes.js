const router = require('express').Router()
const Signature = require('../models/Chat.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.get('/chat', (req, res) => {
    Signature
            .find()
            .then(res.json('Keep Going!'))
            .catch(err => res.status(500).json(err))
})

router.get('/createChat', isAuthenticated, (req, res) => {
    (async function() {
        try {
            const results = await Signature.find({})
            res.json(results)
        } catch (err) {
            throw err
        }
    })()
})
  
router.post('/createChat', isAuthenticated, (req, res) => {
    let { name, message } = req.body
    if (name && message) {
        name = name.trim()
        message = message.trim()
    } else {
        return res.status(422).send('Name and message required!')
    }

    const newSignature = new Signature({
        name: name,
        message: message,
    })
    newSignature.save((err) => {
        if (err) return res.status(500).send('Error saving your message!')
        return res.status(200).send(newSignature)
    })
})


module.exports = router