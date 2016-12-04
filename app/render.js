// app/render.js

// End-point "/" route 
// response: "Hello John+ random Key"
function init(app) {
  app.get('/', (request, response) => {  
    //throw 44
    response.render('home', {
      name: 'John' + request.chance
    })
  })
}

module.exports.init = init 