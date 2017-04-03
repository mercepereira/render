// Unit testing weather service

const sinon = require('sinon')
const weather_service = require('../app/weather')
const expect = require('chai').expect

// sample based on http://bulkan-evcimen.com/testing_with_mocha_sinon.html

var res, err, sentData;
var request    = require('request')
describe('Weather', function(){
  
  before(function(){
    sinon
      .stub(request, 'get')
      .yields(null, null, JSON.stringify({login: 'Barcelona sunny'}));
     
     res = {
            json: function (jsondata) {
              sentData = jsondata;
            },
            send: function(body) {
              err = body;
            }
        };
  });

  after(function(){
    request.get.restore();
  });

  it('can get barcelona weather', function(done){
      req = {params: {city:'Barcelona'}};
      weather_service.searchLocation(req,res);
      expect(request.get).to.have.been.calledOnce;
    //expect(sentData).to.equal('Barcelona sunny');
    done();
  });

});
