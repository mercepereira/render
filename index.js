// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// view definitions
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

app.get('/', (request, response) => {  
  //throw 44
  response.render('home', {
    name: 'John' + request.chance
 })
})

app.use((err, request, response, next) => {  
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(3000)