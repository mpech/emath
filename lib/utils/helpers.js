var fs = require('fs'),
  rek = require('rekuire'),
  $ = rek('$');
  
function allPoints(node, ref){
  var allPoints={};
  $(node).find('_P').each(function(x){
    if(!(x.s in ref)){
      allPoints[x.s]=x;
    }
  });
  return allPoints;
}
module.exports = {
	allPoints:allPoints,
	getGrammar:function(dir){
    console.log('will return '+dir);
	  return function(){
		  return fs.readFileSync(dir+'/grammar.txt').toString();
	  }
  }
}