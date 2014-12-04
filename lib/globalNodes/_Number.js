var util = require('util'),
  grammarParser = require('grammarParser');
  
function _Number(name, s){
  grammarParser.TerminalNode.apply(this, arguments);
}
util.inherits(_Number, grammarParser.TerminalNode);
_Number.prototype.value = function(){
  return parseFloat(this.s, 10);
}

module.exports={
  registerTo:function(nf){
    nf.register('_number', function(name, nodeList, s){
      return new _Number(name, s);
    });
  },
  _Number:_Number
}
