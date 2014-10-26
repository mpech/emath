var rek = require('rekuire'),
  util = require('util'),
  Node = rek('Node'),
  helpers = rek('helpers'),
  $ = rek('$'),
  _nf,
  MyMath = rek('MyMath'),
  TriangleNumber = rek('./TriangleNumber'),
  Point = rek('lib/pool/Point');
  
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
  var foundDupplicate = res.some(function(x){//AB=AC, AB=4 should be possible
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
Triangle.prototype.eqSideToEqNumber = function(eqSide, bipoint, value){
  var res = [];
  $(this).find('triangle_condition').each(function(tr){
    if(tr.nodeList[0] == eqSide){
      res.push(tr);
    }
  });
  var parent = $(this).findFirst('triangle_conditionGroup').coll(0);
  res.forEach(function(tr){
    var correctBipoint = $(tr).find('bipoint').coll().filter(function(x){return x!=bipoint})[0];
    var newCond = this.createConditionNumber(correctBipoint, value);
    parent.replaceChildrenWith(tr, newCond);
  }, this)
}
Triangle.prototype.createConditionNumber = function(bipoint, value){
  var node = _nf.applyFunc('triangle_number', [bipoint, _nf.applyFunc('_'),value])
  var cond = _nf.applyFunc('triangle_condition', [node]);
  return cond;
}
/**
  pred-satisfying bipoint will be replaced by a number and eqSide becomes an eqNumber
*/
Triangle.prototype.replaceEqSideIfBipointIn = function(map){
  var eqSideToMap = [];
  $(this).find('triangle_eqSide').each(function(eq){
    $(eq).find('bipoint').each(function(x){
      if(x.value() in map){
        eqSideToMap.push({node:eq, bipoint:x})
      }
    });
  });
  eqSideToMap.forEach(function(eqData){
    this.eqSideToEqNumber(eqData.node, eqData.bipoint, map[eqData.bipoint.value()])
  }, this);
}
/**
  transform any eqSide with a side whose length is known to an eqNumber with the side associated to the known length
*/
Triangle.prototype.simplifyEqSide = function(){
  var map = {};
  $(this).find('triangle_number').each(function(eq){
    var bipointName = $(eq).findFirst('bipoint').coll(0).value();
    var number = $(eq).findFirst('_number').coll(0);
    map[bipointName] = number;
  });
  this.replaceEqSideIfBipointIn(map);
}
Triangle.prototype.removeEqNumberWith = function(bipoint){
  var res = [];
  //find eqNumber with bipoint
  $(this).find('triangle_condition').each(function(tr){
    if(tr.nodeList[0].name == 'triangle_number'){
      var trn = tr.nodeList[0];
      if(trn.hasBipoint(bipoint)){
        res.push(tr);
      }
    }
  });
  var parent = $(this).findFirst('triangle_conditionGroup').coll(0);
  res.forEach(function(tr){
    parent.removeChild(tr);
  }, this)
}
Triangle.prototype.AB=function(pool, A,B){
  var dAB = MyMath.d(pool.get(Point.keyFrom(A)).getPosition(), pool.get(Point.keyFrom(B)).getPosition());
  var AB = _nf.applyFunc('bipoint',[A,B]);
  var map = {};
  map[AB.value()] = _nf.applyFunc('_number',dAB);
  this.removeEqNumberWith(AB);
  this.replaceEqSideIfBipointIn(map);
}
/**
  (1)if AB
    replace any eqVect with AB
      idem AB=2, BC=AB => BC=2 to be an eqNumber
    ignore eqNumber with AB
    if 2 eqNumber
      C=C(A, AC).intersect(C(B,BC))
    elseif 1 eqNumber
      if perp in A or perp in B
        (perp in B) && switch(A,B)
        perp=Perp(A, (AB))
        if eqNumber.involves(AC)
          C = perp.intersect(C(A,AC))
        else 
          C = perp.intersect(C(B,BC))
      else if perp in C 
        C_AB = circle((A+B)/2, [AB]/2)
        if eqNumber.involves(BC)
          C = C_AB.intersect(C(B, BC))
        else
          C = C_AB.intersect(C(A, AC))
      else
        if eqVect.involves(AC,BC)
          perp = Perp((A+B)/2, [AB])
          C = perp.randomPoint()
        fi
      fi
    else
      if perp in A or perp in B
        (perp in B) && switch(A,B)
        perp=Perp(A, (AB))
        C = perp.randomPoint()
      else 
        if perp in C
          C_AB = circle((A+B)/2, [AB]/2)
        fi
        if eqVect.involves(AC,BC)
          perp = Perp((A+B)/2, [AB])
          C = C_AB.intersect(perp)
        fi
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
  var res = {};
  this.unifyPoints();
  this.simplifyEqSide();
  var points = pool.filterHasPoints(helpers.allPoints(this));
  var mapLetters = ['AB','A','noKnown'];
  this[mapLetters[points.length]].apply(this, [pool].concat(points));
  return res;
}


module.exports={
  getGrammar:helpers.getGrammar(__dirname),
  registerTo:function(nf){
    _nf = nf;
    nf.register('triangle', function(name, nodeList){
      return new Triangle(name, nodeList);
    });
    console.log('registering trn');
    TriangleNumber.registerTo(nf);
  },
  setNodeFactory:function(nf){
    _nf = nf;
  },
  Triangle:Triangle
}
