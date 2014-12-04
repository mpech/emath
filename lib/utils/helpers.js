var fs = require('fs'),
  rek = require('rekuire'),
  $ = rek('$');
  
function allPoints(node, ref){
  var allPoints={};
  var bag = ref||{};
  $(node).find('_P').each(function(x){
    if(!(x.s in bag)){
      allPoints[x.s]=x;
    }
  });
  return Object.keys(allPoints).map(function(x){
    return allPoints[x];
  });
}

function allPointsBut(node, points){
  var list = allPoints(node);
  return list.filter(function(p){
    return points.indexOf(p)==-1
  });
}
function onePointOf(node, points){
  var point = false;
  allPoints(node).some(function(x){
    if(points.indexOf(x)!=-1){
      point = x;
      return true;
    }
  });
  return point;
}
module.exports = {
  onePointOf:onePointOf,
  allPointsBut:allPointsBut,
	allPoints:allPoints,
	getGrammar:function(dir){
	  return function(){
		  return fs.readFileSync(dir+'/grammar.txt').toString();
	  }
  }
}
