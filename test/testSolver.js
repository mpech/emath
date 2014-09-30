var solver = require('../lib/solver.js'),
  fs = require('fs'),
  parser = require('../lib/parser.js'),
  Pool = require('../lib/pool.js'),
  utils = require('../lib/utils.js')();
  
exports.checkInstruction = function(test){
  var gramStr = fs.readFileSync(__dirname+'/data/fullGram.txt').toString();
  parser.parseIt(gramStr, 'ABC, AB=5', function(err, data){
    var pool=new Pool;
    solver.checkInstruction(utils.$(data).find('triangle').coll()[0], pool);
/*    test.ok(pool.has('A'));*/
    test.done();
  });
};
