const request = require('request');

const geoCode = (addr, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=pk.eyJ1IjoidGhlc2ltaXp1IiwiYSI6ImNrbW5yMmlsMTAwMTYydnFyZ3FtMnVrb3gifQ.dYG3bPWIMXAGXUSEHvKVoQ`;
    
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geo location service', undefined);
        } else if (body.features.length == 0) {
            callback('Location not found', undefined);
        } else {
            const {center, place_name} = body.features[0]
            const longitude = center[0]
            const latitude = center[1]
            

            callback(undefined, {
                longitude,
                latitude,
                place_name
            });
        }

        
    });
};

module.exports = geoCode;
