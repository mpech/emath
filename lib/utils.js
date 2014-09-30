var fs = require('fs');
//basic graph traversing
function $(coll){
  if(!(coll instanceof Array)){
    coll=[coll];
  }
  var ret = {
    find:function(str){
      var newColl=[];
      coll.forEach(function(x){
        x.traverse(function(o){
          if(typeof(str)=='string'){
            if(o.name==str){
              newColl.push(o);
            }
          }else if(o.name.match(str)){
            newColl.push(o);
          }
        });
      })
      return $(newColl);
    },
    each:function(cbk){
      coll.forEach(cbk);
      return ret;
    },
    coll:function(){
      return coll;
    }
  };
  return ret;
}
function undefinedPoints(node, ref){
  var undefinedPoints={};
  $(node).find('_P').each(function(x){
    if(!(x.s in ref)){
      undefinedPoints[x.s]=x;
    }
  });
  return undefinedPoints;
}
module.exports=function(dir){
  return {
    getGrammar:function(){
      return fs.readFileSync(dir+'/grammar.txt').toString();
    },
    $:$,
    undefinedPoints:undefinedPoints
  }
}
