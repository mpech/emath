function Axiome(){

}
Axiome.types = ['Line', 'Circle'];
Axiome.prototype.getPoint=function(){}
Axiome.prototype.methodName = function(o){
  return 'intersect'+o.type;
}
Axiome.prototype.intersect=function(o){
  var methodName = this.methodName(o);
  if(!this[methodName]){
    throw methodName+' not implemented in '+typeof(o)
  }
  return this[methodName](o);
}
/*

  
['Line', 'Circle'].forEach(function(type){
Axiome.prototype['intersect'+type] = function(other, visited){
    if(visited){
      throw 'no intersection implemented for '+typeof(this)+'-'+typeof(other);
    }
    return other.intersect(this, true);
  });

  
});
*/
module.exports=Axiome;
