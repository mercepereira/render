// app/weather.js
 const rp = require('request-promise') // request-promise module: handle http request to external API using promise pattern; // npm install request-promise --save ; npm install request --save 
 

// "Search Weather location" request processing
function searchLocation(request,response) {
    console.log("city: " + request.params.city)  

    // API sample: http://developer.accuweather.com/accuweather-locations-api/apis/get/locations/v1/search
    rp({
        uri: 'http://dataservice.accuweather.com/locations/v1/search',
        qs: {
        //q: request.params.city,
        apikey: 'd12VAWDxxsyLAEAs47vNkb4USak3gqmw',
        q: 'barcelona'
        },
        json: true
    })
        .then((data) => {
            console.log(data)
            response.json(data)
            //response.render('index', data)
        })
        .catch((err) => {
            console.log(err)
            //response.render('error')
            response.send(err)
        })
}

module.exports.searchLocation = searchLocation