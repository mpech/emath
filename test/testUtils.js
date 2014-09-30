var utils = require('../lib/utils.js')('useless'),
  fs = require('fs'),
  parser = require('../lib/parser.js');
exports.find = function(test){
  var gramStr = fs.readFileSync(__dirname+'/data/fullGram.txt').toString();
  parser.parseIt(gramStr, 'ABC, AB=5,', function(err, data){
    var o = utils.$(data);
    var y=[];
    o.find(/^_number$/).each(function(x){
      y.push(x);
    });
    test.equal(y.length, 1);
    test.equal(y[0].s, 5);
    var z = [];
    o.find('_number').each(function(x){
      z.push(x);
    });
    test.equal(z.length, 1);
    test.equal(z[0].s, 5);
    test.done();
  })
};

