var util = require('util'),
  rek = require('rekuire'),
  Node = rek('lib/instructions/Node');
  
function Bipoint(name, nodeList){
  Node.call(this, name, nodeList);
}
util.inherits(Bipoint, Node);
Bipoint.prototype.value = function(){
  return this.toString().split('').sort(function(a,b){return a.localeCompare(b)}).join('');
}
Bipoint.prototype.equal = function(bipoint){
  return this.value() == bipoint.value();
}
module.exports={
  registerTo:function(nf){
    nf.register('bipoint', function(name, nodeList){
      return new Bipoint(name, nodeList);
    });
  },
  Bipoint:Bipoint
}
