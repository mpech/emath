function Pool(){
  this.pool = {};
}
Pool.prototype.has = function(key){
  return key in this.pool;
}
Pool.prototype.keys = function(){
  return Object.keys(this.pool);
}
Pool.prototype.values = function(){
  var v=[];
  for(var i in this.pool){
    v.push(this.pool[i]);
  } 
  return v;
}
Pool.prototype.filterHasPoints = function(coll){
  return coll.filter(function(x){
    return this.has(x.name);
  }, this);
}
module.exports=Pool;
