var util = require('util'),
  rek = require('rekuire'),
  Node = rek('lib/instructions/Node'),
  $ = rek('$');
  
function Instruction(name, nodeList){
  Node.call(this, name, nodeList);
}
util.inherits(Instruction, Node);
Instruction.prototype.hasPoint = function(point){
  return $(this).find('_P').filter(function(p){
    return p == point
  }).length
}
module.exports={
  registerTo:function(nf){
    nf.register('instruction', function(name, nodeList){
      return new Instruction(name, nodeList);
    });
  },
  Instruction:Instruction
}
