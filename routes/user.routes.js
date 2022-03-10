const router = require('express').Router()
const User = require('../models/User.model')
const { isAuthenticated } = require('../middleware/jwt.middleware')


router.get('/getAllUsers', (req, res) => {
    User
        .find()
        .select('username description email password avatar birthday role')
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:user_id', (req, res) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .populate('friends')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:user_id/edit', (req, res) => {
    const { user_id } = req.params
    const { username, description, email, password, avatar, birthday, role } = req.body
    User
        .findByIdAndUpdate(user_id, { username, description, email, password, avatar, birthday, role }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteUser/:user_id/delete', (req, res) => {
    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/addFriend/:user_id', isAuthenticated, (req, res) => {
    const { user_id } = req.params
    const { _id } = req.payload
    User
        .findById(_id)
        .then(response => {
            if (response.friends.includes(user_id) || user_id == _id) { 
                res.json(response)
            } else {
                User
                    .findByIdAndUpdate(_id, {$push: {friends: user_id}}, {new: true})
                    .then(response => res.json(response)) 
            }
        })
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteFriend/:user_id/delete', isAuthenticated, (req, res) => {
    const { user_id } = req.params
    const { _id } = req.payload
    User
        .findById(_id)
        .then(response => {
            if (response.friends.includes(user_id)) {
                User
                    .findByIdAndUpdate(_id, {$pull: {friends: user_id}}, {new: true})
                    .then(response => res.json(response)) 
            } else {
                res.json(response)
            }
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router