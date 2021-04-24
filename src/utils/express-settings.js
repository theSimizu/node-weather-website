const express = require('express')
const path = require('path')
const hbs = require('hbs')
module.exports = (app) => {
    
    const templatesPath = path.join(__dirname, '../../templates/views')

    // Setup handlebars engine
    app.engine('html', hbs.__express)
    app.set('view engine', 'html')
    app.set('views', templatesPath)

    // Setup static directory to server
    app.use(express.static('public'))
}

