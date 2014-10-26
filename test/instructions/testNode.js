var fs = require('fs'),
  rek = require('rekuire'),
  $ = rek('$'),
  MyNode = rek('lib/instructions/Node.js'),
  grammarParser = require('grammarParser'),
  TerminalNode = grammarParser.TerminalNode;

exports.traverseFirst = function(test){
  var helloNode = new TerminalNode('hello');
  var node = new MyNode('root', [
    new TerminalNode('leaf'),
    new MyNode('tree', [
      new TerminalNode('useless'),
      helloNode,
      new TerminalNode('hello2')
    ])
  ]);
  var res = node.traverseFirst(function(s){
    return s.name == 'hello';
  });
  test.equal(res, helloNode);
  test.done();
};
/*
exports.unifyPoints = function(test){
  var helloNode = new TerminalNode('hello2');
  var node = new MyNode('root', [
    new MyNode('bipoint', [
      helloNode,
      new TerminalNode('hello2')
    ]),
    new MyNode('bipoint', [
      helloNode,
      new TerminalNode('hello2')
    ])
  ]);
  node.unifyPoints();
  test.equal(node.nodeList[0].nodeList[1], helloNode);
  //test.equal(node.nodeList[1].nodeList[1], helloNode);
  //test.equal(node.nodeList[0], helloNode);
  test.done();
};

*/