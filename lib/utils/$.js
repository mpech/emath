function $(coll){
  if(coll.$__wrapped){
    return coll;
  }
  if(!(coll instanceof Array)){
    coll=[coll];
  }
  var ret = {
    $__wrapped:true,
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
module.exports = $;