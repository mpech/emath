var grammarParser = require('grammarParser');
function Node(name, nodeList){
  grammarParser.Node.call(this, name, nodeList);
}
Node.prototype.traverseFirst = function(check){
  if(check(this)){
    return this;
  }
  var obj = false;
  this.nodeList.some(function(node){
    if(node instanceof grammarParser.TerminalNode){
      if(check(node)){
        obj = node;
      }
    }else{
      obj = node.traverseFirst(check);
    }
    return obj;
  });
  return obj;
}
module.exports=Node;