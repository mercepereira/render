// app/render.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// view definitions
// path Node-module to handle files and directory paths 
// https://nodejs.org/dist/latest-v6.x/docs/api/path.html
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')  
}))

app.set('view engine', '.hbs')
app.set('views',path.join(__dirname,'views'))

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
  console.log(err)
  response.status(500).send('Something broke!')
})

// request processing
app.get('/', (request, response) => {  
  //throw 44
  response.render('home', {
    name: 'John' + request.chance
 })
})

// waiting for request
app.listen(3000)