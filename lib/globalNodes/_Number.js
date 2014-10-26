var util = require('util'),
  grammarParser = require('grammarParser');
  
function _Number(name, s){
  grammarParser.TerminalNode.call(this, name, s);
}
util.inherits(_Number, grammarParser.TerminalNode);
_Number.prototype.value = function(){
  return parseFloat(this.s, 10);
}

module.exports={
  registerTo:function(nf){
    nf.register('_Number', function(name, s){
      return new _Number(name, s);
    });
  },
  _Number:_Number
}
