// Module requires
const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')
const expressRoutes = require('./utils/express-routes')
const expressSettings = require('./utils/express-settings')

const port = process.env.PORT || 666

// Setup directorys path
const partialsPath = path.join(__dirname, '../templates/partials')

// Partials directory
hbs.registerPartials(partialsPath)

expressSettings(app)
expressRoutes(app)

app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})