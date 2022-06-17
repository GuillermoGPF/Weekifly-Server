const router = require('express').Router()

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/plans', require('./plans.routes'))
router.use('/upload', require('./upload.routes'))
router.use('/ads', require('./ads.routes'))

module.exports = router