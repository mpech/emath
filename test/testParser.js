var parser = require('../lib/parser.js'),
  fs = require('fs');
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

