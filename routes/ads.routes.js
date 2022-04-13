const router = require('express').Router()
const Ads = require('../models/Ads.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.get('/getAllAds', (req, res) => {
    Ads
        .find()
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => res.status(500).json(err))
})

router.post('/createAd', isAuthenticated, (req, res) => {
    const { name, description, image } = req.body
    const { _id } = req.payload
    Ads
        .create({ name, description, image, owner: _id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneAd/:ad_id', (req, res) => {
    const { ad_id } = req.params
    Ads
        .findById(ad_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editOneAd/:ad_id/edit', (req, res) => {
    const { ad_id } = req.params
    const { name, description, image, owner } = req.body
    Ads
        .findByIdAndUpdate(ad_id, { name, description, image, owner }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteOneAd/:ad_id/delete', (req, res) => {
    const { ad_id } = req.params
    Ads
        .findByIdAndDelete(ad_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router