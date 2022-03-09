const router = require('express').Router()
const Plans = require('./../models/Plans.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.get('/getAllPlans', (req, res) => {
    Plans
         .find()
         .then(response => setTimeout(() => res.json(response), 2000))
         .catch(err => res.status(500).json(err))
})

router.post('/createPlan', isAuthenticated, (req, res) => {
    const { name, description, image } = req.body
    const { _id } = req.payload
    Plans
         .create({ name, description, image, owner: _id })
         .then(response => res.json(response))
         .catch(err => res.status(500).json(err))
})

router.get('/getOnePlan/:plan_id', (req, res) => {
    const { plan_id } = req.params
    Plans
         .findById(plan_id)
         .then(response => res.json(response))
         .catch(err => res.status(500).json(err))
})

router.put('/editOnePlan/:plan_id/edit', (req, res) => {
    const { plan_id } = req.params
    const { name, description, image, owner } = req.body
    Plans
         .findByIdAndUpdate(plan_id, { name, description, image, owner }, { new: true })
         .then(response => res.json(response))
         .catch(err => res.status(500).json(err))
})

router.delete('/deleteOnePlan/:plan_id/delete', (req, res) => {
    const { plan_id } = req.params
    Plans
         .findByIdAndDelete(plan_id)
         .then(response => res.json(response))
         .catch(err => res.status(500).json(err))
})

module.exports = router