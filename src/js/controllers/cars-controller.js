'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('', 'cars', function () {
  $.ajax({
    url: "car-data.data",
    method: 'GET'
  })
	
	.then(parseCarData)
   .then(renderCars)
  // .then( function name(cars) {
  //   console.log(cars);
  // }) 
  
 
  
  
  function parseCarData(carData) {
    return carData
      .split('\n')
      .map(function (record, i) {
        var cells = record.split(',');
        
        return {
          id: i,
          make: cells[2]
        //   cityMpg: cells[23],
        //   highwayMpg: cells[24],
        //   price: cells[25]
        };
      });
  }
	
	  function renderCars(carsArray) {
    var carsTemplate = views['all-cars-template'];
    var templateFn = _.template(carsTemplate, { variable: 'm' });
    var carsHTML = templateFn({ cars: carsArray });
    
    $('.main-content').html(carsHTML);
  }
});