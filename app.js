require('dotenv/config')
require('./db')

const express = require('express')
const app = express()

require('./config')(app)

const projectName = 'weekifly'
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase()
app.locals.title = `${capitalized(projectName)}`

const allRoutes = require('./routes/index.routes')
app.use('/api', allRoutes)

require('./error-handling')(app)

module.exports = app