var utils = require('../utils.js')(__dirname),
  grammarParser = require('grammarParser'),
  util = require('util'),
  $ = utils.$;
/*
  In condition
  ABC, expects only A,B or C to be present in conditions
*/
function Triangle(name, nodeList){
  grammarParser.Node.call(this, name, nodeList);
}
util.inherits(Triangle, grammarParser.Node);

Triangle.prototype.checkPerp = function(errors){
  if($(this).find('triangle_perp').coll().length >= 2){
    errors.push('too many perp conditions');
    return false;
  }
  return true;
}

Triangle.prototype.checkDef = function(errors){
  var res = $(this).find('triangle_bipoint').coll();
  res = res.concat($(this).find('triangle_number').coll());
  var mymap = {};
  var dupplicateName;
  var foundDupplicate = res.some(function(x){
    var name = x.toString();
    if(!name in mymap){
      mymap[name]=1;
      return false;
    }
    dupplicateName = name;
    return true;
  });
  if(foundDupplicate){
     errors.push('too many definition for same bipoint '+dupplicateName);
     return false;
  }
  
  mymap = {};
  $(this).find('_P').coll().forEach(function(x){
    mymap[x.s]=1;
  });
  if(Object.keys(mymap).length > 3){
    errors.push('too many letters in condition, expect to be edges of triangle');
    return false;
  }
  return true;
}

Triangle.prototype.checkCondition = function(errors){
  this.checkPerp(errors);
  this.checkDef(errors);
  return errors.length===0;
}

Triangle.prototype.solve = function(pool){
  var coll = utils.$(this).find('triangle_perp').coll();
  var A = axiomes.getAnyPoint(pool);
  if(coll.length){
    var res = $(coll[0]).find('bipoint').coll();
    var points = res.map(function(x){return x.toString()});
    var firstBipoint = points[0];
    var equality = $(this).find('triangle_number').coll();
    var options = {point:A};
    if(equality.length){
      options.distance = $(this).find('number').coll()[0].toString();
    }
    var B = axiomes.getLine(options);
    var equality = 
    var Temporary = axiomes.getPerp({point: , line:axiomes.line(A,B)});
    
  }else{
    //put common point anywhere
  }
}
module.exports={
  getGrammar:utils.getGrammar,
  registerTo:function(nf){
    nf.register('triangle', function(name, nodeList){
      return new Triangle(name, nodeList);
    });
  },
  Triangle:Triangle
}
