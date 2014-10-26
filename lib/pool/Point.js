//point implements _s <= points name
function Point(point, position){
  this.point = point;
  this.position = position;
}
Point.prototype.value = function(){
  return 'point_'+this.point.s;
}
Point.prototype.getPosition = function(){
  return this.position;
}
Point.keyFrom = function(point){
  return Point.prototype.value.call({point:point});
}
module.exports = Point;