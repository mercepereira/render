// Unit testing weather service

const sinon = require('sinon')
const request    = require('request')
const weather_service = require('../app/weather')


// sample based on http://bulkan-evcimen.com/testing_with_mocha_sinon.html

var req, res, err, sentData;
describe('Weather', function(){
  
  before(function(){
    sinon
      .stub(request, 'get')
      .yields(null, null, JSON.stringify({login: 'Barcelona sunny'}));
     
     res = {
            json: function (jsondata) {
              sentData = jsondata
            },
            send: function(body) {
              err = body
            }
        };
  });

  after(function(){
    request.get.restore();
  });

  it('can get barcelona weather', function(done){
    req.url = { param:'barcelona' }
    weather_service.searchLocation(req,res)
    expect(sentData).to.equal('Barcelona sunny');
    done();
  });

});
