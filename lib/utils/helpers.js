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
  return allPoints;
}
module.exports = {
	allPoints:allPoints,
	getGrammar:function(dir){
	  return function(){
		  return fs.readFileSync(dir+'/grammar.txt').toString();
	  }
  }
}