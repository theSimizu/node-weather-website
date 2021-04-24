const geoCode = require('./geo-code')
const weatherStack = require('./weather-stack')
const name = 'Vitor Simizu'

const getWeather = (address, callback) => {
    geoCode(address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            callback(error, undefined)
        } else {
            weatherStack(latitude, longitude, (error, {temperature, precip} = {}) => {
                if (error) {
                    callback(error, undefined)
                } else {
                    callback(undefined, {
                        place_name,
                        temperature,
                        precip,
                        coordinate: `${latitude}, ${longitude}`
                    })
                }
                
            })
        }
        
    })
}

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index', {
            title: 'Weather app', 
            name
        })
    })
    
    app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide an address'
            })
        }

        getWeather(req.query.address, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send(data)
        })


    })
    
    app.get('/products', (req, res) => {
        res.send({
            products: []
        })
    })
    
    app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About',
            name
        })
    })
    
    app.get('/help', (req, res) => {
        res.render('help', {
            helpText: 'This is some helpful text :)',
            title: 'Help',
            name
        })
    })
    
    app.get('*', (req, res) => {
        res.render('error_404', {
            title: '404',
            name
        })
    })
}