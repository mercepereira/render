// app/index.js module
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const home_service = require('./render')
const rp = require('request-promise')   
// npm install request --save

const app = express()


// view definitions
// path Node-module to handle files and directory paths 
// https://nodejs.org/dist/latest-v6.x/docs/api/path.html
// layoutsDir: path.join(__dirname, 'views/layouts')
const dir = '/home/merce/Projects/render/'
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(dir, 'views/layouts')  
}))

app.set('view engine', '.hbs')
// app.set('views',path.join(__dirname,'views'))
app.set('views',path.join(dir,'views'))

// middleware pattern
app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})

app.use((err, request, response, next) => {  
  // log the error, for now just console.log
  console.log("app.use error:" + err)
  response.status(500).send('Something broke!')
})


//end-point "/<city name>"
// weather_service.init(app)
app.get('/:city', (request, response) => {  
  rp({
    uri: 'http://apidev.accuweather.com/locations/v1/search',
    qs: {
      q: request.params.city,
      apiKey: 'cloudBurst'
         // Use your accuweather API key here
    },
    json: true
  })
    .then((data) => {
      response.render('index', data)
    })
    .catch((err) => {
      console.log(err)
      response.render('error')
    })  
    
})

// microserver waiting for request
app.listen(3000)