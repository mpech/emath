var rek = require('rekuire'),
  $ = rek('$'),
  helpers = rek('helpers')
  
function checkInstruction(instructionNode, pool){
  //checking points
  var undefinedPoints = helpers.undefinedPoints(instructionNode, pool);
  
  var leftHand = $(instructionNode.nodeList.filter(function(x){
    return !x.name.match('Condition');
  })).find('_P').coll().map(function(x){
    return x.s;
  });
  for(var i in undefinedPoints){
    if(leftHand.indexOf(i) == -1){
      throw i+' not defined in '+Object.keys(pool)+' nor specified in left hand';
    }
  }
  
  //checking alias
  var coll = $(instructionNode).find('_alias').coll();
  for(var i = 0; i < coll.length; ++i){
    if(!(coll[i] in pool)){
      throw i+' not defined in '+Object.keys(pool);
    }
  }
  
  //checking conditions
  return instructionNode.checkCondition();
}
function resolve(tree){
  var pool={};
  $(tree).find('instruction').each(function(x){
    var node = x.nodeList[0];
    if(checkInstruction(node, pool)){
      node.resolve(pool); 
    }   
  });
}
module.exports = {
  checkInstruction: checkInstruction,
  resolve:resolve
}
