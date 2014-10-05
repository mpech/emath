var fs = require('fs'),
  rek = require('rekuire'),
  $ = rek('$'),
  parser = rek('lib/parser');

exports.concatGrams = function(test){
  var fname = __dirname+'/data/commonGram.txt',
    str = fs.readFileSync(fname).toString();
  parser.concatGrams(fname, function(err, data){
    test.ok(data.length > str.length);
    test.equal(data.indexOf('hello'), 0);
    test.ok(data.match('world'));
    test.done();
  })
};
exports.parseIt = function(test){
  var gramStr = fs.readFileSync(__dirname+'/data/fullGram.txt').toString();
  parser.parseIt(gramStr, 'ABC, AB=5', function(err, data){
    test.ok(data);
    test.done();
  })
};

exports.find = function(test){
  var gramStr = fs.readFileSync(__dirname+'/data/fullGram.txt').toString();
  parser.parseIt(gramStr, 'ABC, AB=5,', function(err, data){
    var o = $(data);
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

