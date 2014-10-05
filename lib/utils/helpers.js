var fs = require('fs');
function undefinedPoints(node, ref){
  var undefinedPoints={};
  $(node).find('_P').each(function(x){
    if(!(x.s in ref)){
      undefinedPoints[x.s]=x;
    }
  });
  return undefinedPoints;
}
module.exports = {
	undefinedPoints:undefinedPoints,
	getGrammar:function(dir){
    console.log('will return '+dir);
	  return function(){
		  return fs.readFileSync(dir+'/grammar.txt').toString();
	  }
  }
}