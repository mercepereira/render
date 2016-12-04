// app/weather.js
const rp_weather = require('request-promise') // request-promise module: handle http request to external API using promise pattern; npm install request-promise --save  

// End-point: "/<cityname>
// "Search Weather location" request processing
function init(app) {
    app.get('/:city', (request, response) => {  
        
        // API sample: https://github.com/AccuWeather/AccuWeatherApiSamples/blob/master/currentconditions.html
        const options = {  
        method: 'GET',
        uri: 'http://apidev.accuweather.com/locations/v1/search',
        qs: {
            q: request.params.city,
            apiKey: 'cloudBurst'
                // Use your accuweather API key here
            },
            json: true
        }

    ​   rp_weather(options)
        .then((data) => {
            response.render('weather', {
                locationsearch: data
                })
        })
        .catch ((err) => {
            console.log(err)
            response.render('error:' + err)
        })
    })
}

module.exports.init = init 