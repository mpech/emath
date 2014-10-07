var grammarParser = require('grammarParser'),
  rek = require('rekuire'),
  triangleModule = rek('lib/instructions/triangle'),
  Node = rek('Node');
  

exports.readGrammar = function(test){
  test.ok(triangleModule.getGrammar().length>10);
  test.done();
};
exports.testInstance = function(test){  
  var obj = {
    register:function(a,b){
      this.key = a;
      this.value = b;
    }
  }
  triangleModule.registerTo(obj);
  test.ok(obj.value() instanceof Node);
  test.done();
};
exports.checkCondition = function(test){
  var instance = new triangleModule.Triangle('bob',[]);
  test.ok(instance.checkCondition([]));
  test.done();
}
exports.checkPerp = function(test){
  var instance = new triangleModule.Triangle('bob',[
    new grammarParser.Node('triangle_perp',[]),
    new grammarParser.Node('triangle_perp',[])
  ]);
  var errors = [];
  test.ok(!instance.checkPerp(errors));
  test.equal(errors.length, 1);
  test.done();
}
exports.checkDefTooManyMesures = function(test){
  var instance = new triangleModule.Triangle('bob',[
    new grammarParser.Node('triangle_bipoint',[]),
    new grammarParser.Node('triangle_bipoint',[]),
    new grammarParser.Node('triangle_mesure',[]),
    new grammarParser.Node('triangle_mesure',[]),
  ]);
  var errors = [];
  test.ok(!instance.checkDef(errors));
  test.equal(errors.length, 1);
  test.done();
}

exports.checkDefTooManyPoints = function(test){

  var instance = new triangleModule.Triangle('bob',[
    new grammarParser.TerminalNode('_P','A'),
    new grammarParser.TerminalNode('_P','B'),
    new grammarParser.TerminalNode('_P','C'),
    new grammarParser.TerminalNode('_P','D'),
  ]);
  var errors = [];
  var res = instance.checkDef(errors);
  test.ok(!res);
  test.equal(errors.length, 1);
  test.done(); 
}

exports.solve = function(test){
  test.done();
}
