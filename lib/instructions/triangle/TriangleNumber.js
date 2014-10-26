var util = require('util'),
  rek = require('rekuire'),
  Node = rek('lib/instructions/Node'),
  $ = rek('$');
  
function TriangleNumber(name, nodeList){
  Node.call(this, name, nodeList);
}
util.inherits(TriangleNumber, Node);//we may want to inherit from TriangleCondition if needed
TriangleNumber.prototype.hasBipoint = function(bipoint){
  return $(this).findFirst('bipoint').coll(0).equal(bipoint);
}

module.exports={
  registerTo:function(nf){
    nf.register('triangle_number', function(name, nodeList){
      return new TriangleNumber(name, nodeList);
    });
  },
  TriangleNumber:TriangleNumber
}
