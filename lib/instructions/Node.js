var grammarParser = require('grammarParser'),
  util = require('util'),
  rek = require('rekuire'),
  $ = rek('$');
function Node(name, nodeList){
  grammarParser.Node.call(this, name, nodeList);
}
util.inherits(Node, grammarParser.Node);
Node.prototype.replaceChildrenWith = function(a,b){
  for(var i = 0; i < this.nodeList.length; ++i){
    if(this.nodeList[i] == a){
      this.nodeList[i] = b;
    }
  }
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
Node.prototype.unifyPoints = function(){
  var map = {};
  $(this).find('bipoint').each(function(x){
    x.nodeList.forEach(function(p, index){
      if(p.name in map){
        this[index] = p;
      }else{
        map[p.name] = p;
      }
    });
  });
}
Node.prototype.removeChild = function(a){
  this.nodeList = this.nodeList.filter(function(x){
    return x!=a;
  });
}
module.exports=Node;