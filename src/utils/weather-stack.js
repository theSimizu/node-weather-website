const request = require('request');

const weatherstack = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=671e267e0a55c151259211c29688e6ab&query=
                 ${latitude},${longitude}`;

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Location not found', undefined);
        } else {
            callback(undefined, {
                name: body.location.name,
                temperature: body.current.temperature,
                precip: body.current.precip,
                latitude,
                longitude
            });
        }
    });
};

module.exports = weatherstack;
