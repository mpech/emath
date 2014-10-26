function $(coll){
  if(coll.$__wrapped){
    return coll;
  }
  if(!(coll instanceof Array)){
    coll=[coll];
  }
  function matchByString(str, node){
    if(typeof(str)=='string'){
      return node.name==str
    }
    return node.name.match(str)
  }
  var ret = {
    $__wrapped:true,
    findFirst:function(str){
      var obj = false;
      coll.some(function(collNode){
        obj = collNode.traverseFirst(function(node){
          return matchByString(str, node);
        });
        return obj;
      });
      return $(obj);
    },
    find:function(str){
      var newColl=[];
      coll.forEach(function(x){
        x.traverse(function(o){
          if(matchByString(str, o)){
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
    coll:function(a){
      if(arguments.length){
        return coll[a];
      }
      return coll;
    }
  };
  return ret;
}
module.exports = $;