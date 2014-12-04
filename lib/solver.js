var rek = require('rekuire'),
  $ = rek('$'),
  helpers = rek('helpers')
  
function checkInstruction(instructionNode, pool){
  //checking points
  var allPoints = helpers.allPoints(instructionNode, pool);
  
  var leftHand = $(instructionNode.nodeList.filter(function(x){
    return !x.name.match('Condition');
  })).find('_P').coll().map(function(x){
    return x.s;
  });
  leftHand.forEach(function(s){
    var res = allPoints.some(function(p){
      return p.name() == s
    })
    if(!res){
      throw s+' not defined in '+pool.keys()+' nor specified in left hand';
    }
  })
  
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
