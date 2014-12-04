var util = require('util'),
  rek = require('rekuire'),
  Node = rek('lib/instructions/Node'),
  Bipoint = rek('lib/globalNodes/Bipoint').Bipoint,
  $ = rek('$');
  
function TriangleNumber(name, nodeList){
  Node.call(this, name, nodeList);
}
util.inherits(TriangleNumber, Node);//we may want to inherit from TriangleCondition if needed
TriangleNumber.prototype.hasBipoint = function(bipoint){
  return $(this).findFirst('bipoint').coll(0).equal(bipoint);
}
TriangleNumber.prototype.sideValue = function(bipoint){
  return $(this).findFirst('_number').coll(0).value()
}
TriangleNumber.prototype.involves = function(A,B){
  return this.hasBipoint(new Bipoint('bipoint', [A,B]));
}
module.exports={
  registerTo:function(nf){
    nf.register('triangle_number', function(name, nodeList){
      return new TriangleNumber(name, nodeList);
    });
  },
  TriangleNumber:TriangleNumber
}
