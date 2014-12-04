var grammarParser = require('grammarParser'),
  rek = require('rekuire'),
  triangleModule = rek('lib/instructions/triangle'),
  Node = rek('Node'),
  $ = rek('lib/utils/$'),
  _Number = rek('lib/globalNodes/_Number')._Number,
  bipointModule = rek('lib/globalNodes/Bipoint'),
  Bipoint = bipointModule.Bipoint,
  TriangleNumber = rek('TriangleNumber').TriangleNumber,
  Pool = rek('lib/Pool'),
  Point = rek('lib/pool/Point'),
  MyMath = rek('MyMath')
  
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
exports.simplifyEqSide = function(test){
  var instance = new triangleModule.Triangle('triangle_conditionGroup',[
    new Node('triangle_condition', [
      new Node('triangle_number', [ 
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','A'), new grammarParser.TerminalNode('_P','B')]),
        new _Number('_number', '4')
      ])
    ]),
    new Node('triangle_condition', [
      new Node('triangle_eqSide', [
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','A'), new grammarParser.TerminalNode('_P','B')]),
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','A'), new grammarParser.TerminalNode('_P','C')]),
      ])
    ]),
    new Node('triangle_condition', [
      new Node('triangle_eqSide', [
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','C'), new grammarParser.TerminalNode('_P','B')]),
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','A'), new grammarParser.TerminalNode('_P','B')]),
      ])
    ])
  ]);
  var nf = grammarParser.NodeFactory();
  triangleModule.setNodeFactory(nf);
  instance.simplifyEqSide();
  var res = $(instance).find('triangle_eqSide').coll();
  test.equal(res.length, 0, 'everything replaced');
  var res = $(instance).find('triangle_number').coll();
  test.equal(res.length, 3, 'all eqnumber');
  test.equal(res[0].toString(),'AB4');
  test.equal(res[1].toString(),'AC4');
  test.equal(res[2].toString(),'CB4');
  test.done()
}

exports.removeEqNumberWith = function(test){
  var A = new grammarParser.TerminalNode('_P','A'), 
      B = new grammarParser.TerminalNode('_P','B');

  var instance = new triangleModule.Triangle('triangle_conditionGroup',[
    new Node('triangle_condition', [
      new TriangleNumber('triangle_number', [ 
        new Bipoint('bipoint', [A,B]),
        new _Number('_number', '4')
      ])
    ])
  ]);
  var nf = grammarParser.NodeFactory();
  triangleModule.registerTo(nf);
  instance.removeEqNumberWith(new Bipoint('bipoint', [B,A]));
  test.equal($(instance).find('triangle_number').coll().length, 0);
  test.done();
}


exports.AB = function(test){
  var A = new grammarParser.TerminalNode('_P','A');
  var B = new grammarParser.TerminalNode('_P','B');
  var instance = new triangleModule.Triangle('triangle_conditionGroup',[
    new Node('triangle_condition', [
      new TriangleNumber('triangle_number', [ 
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','A'), new grammarParser.TerminalNode('_P','B')]),
        new _Number('_number', '4')
      ])
    ]),
    new Node('triangle_condition', [
      new Node('triangle_eqSide', [
        new Bipoint('bipoint', [A,B]),
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','A'), new grammarParser.TerminalNode('_P','C')]),
      ])
    ]),
    new Node('triangle_condition', [
      new Node('triangle_eqSide', [
        new Bipoint('bipoint', [new grammarParser.TerminalNode('_P','C'), new grammarParser.TerminalNode('_P','B')]),
        new Bipoint('bipoint', [A,B]),
      ])
    ])
  ]);
  var pool = new Pool();
  var pA = new Point(A, MyMath.P(0,0,0));
  pool.store(pA);
  pool.store(new Point(B, MyMath.P(1,0,0)));
  var nf = grammarParser.NodeFactory();
  bipointModule.registerTo(nf);
  triangleModule.registerTo(nf);
  instance.AB(pool, A, B);
  test.done();//to continue
}