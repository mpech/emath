var rek = require('rekuire'),
  util = require('util'),
  Node = rek('Node'),
  helpers = rek('helpers'),
  $ = rek('$');
  
/*
  In condition
  ABC, expects only A,B or C to be present in conditions
*/
function Triangle(name, nodeList){
  Node.call(this, name, nodeList);
}
util.inherits(Triangle, Node);

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
  errors = errors||[];
  this.checkPerp(errors);
  this.checkDef(errors);
  return errors.length===0;
}
/**
  (1)if AB
    replace any eqVect with AB
    if 2 eqNumber
      circleIntersection
    elseif 1 eqNumber
      if perp in A or perp in B
        if eqNumber is hypothenuse
          deduce C
        else
          circle([AB]/2)
          intersectCircle
        fi
      else if perp in C
        circle(AB/2)
        circle(A, radius)
        intersectCircle
      else
        circle(A), any point
      fi
    else
      if perp in A or perp in B
        linePerp(A,B)
        any point
      else if perp in C
        circle(AB/2)
        any point of circle
      fi
    fi
  (2)if A
    replace any eqVect with BC
    if eqNumber AB ou AC || AB==BC and eqNumberBC || AC==BC and eqNumberBC
      define B from circle, goto(1)
    else anyB, goto(1)
  (3) if no, set A, goto(2)
*/
Triangle.prototype.solve = function(pool){
  var coll = utils.$(this).find('triangle_perp').coll();
  var res = {};
  var points = pool.filterHasPoints(allPoints(coll));
  var mapLetters = {
    1:'AB',
    2:'A',
    3:'noKnown'
  }
  this.mapLetters(points, mapLetters[points.length]);
  this.AB(res) || this.A(res) || this.noKnown(res);
  return res;
}
module.exports={
  getGrammar:helpers.getGrammar(__dirname),
  registerTo:function(nf){
    nf.register('triangle', function(name, nodeList){
      return new Triangle(name, nodeList);
    });
  },
  Triangle:Triangle
}
