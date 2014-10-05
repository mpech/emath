var rek = require('rekuire'),
  fs = require('fs'),
  solver = rek('lib/solver'),
  parser = rek('lib/parser'),
  Pool = rek('lib/pool'),
  $ = rek('lib/utils/$');
  
exports.checkInstruction = function(test){
  var gramStr = fs.readFileSync(__dirname+'/data/fullGram.txt').toString();
  parser.parseIt(gramStr, 'ABC, AB=5', function(err, data){
    var pool = new Pool;
    solver.checkInstruction($(data).find('triangle').coll()[0], pool);
/*    test.ok(pool.has('A'));*/
    test.done();
  });
};
