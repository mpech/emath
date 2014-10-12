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
