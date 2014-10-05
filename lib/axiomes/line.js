var util = require('util'),
  rek = require('rekuire'),
  Axiome = rek('lib/axiomes/axiome'),
  MyMath = rek('lib/utils/MyMath');

function Line(o){
  this.A = o.A;
  this.v = o.v;
  this.type = 'Line'; //ugly use for reflection...
}
util.inherits(Line, Axiome);

Line.prototype.intersectLine = function(l){
  if(MyMath.areColinear(this.v, l.v)){
    if(this.contains(l.A)){
      return [l.A];
    }
    return []; //colinear and not same line
  }
  //there IS intersection
  //http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
  var p = this.A, 
    q = l.A,
    rs = MyMath.cross(this.v, l.v),
    t = MyMath.cross(MyMath.v(p, q), l.v) /rs;
  return [MyMath.sum(p, MyMath.scalVect(t, this.v))];
}

Line.prototype.contains = function(p){
  var v = MyMath.v(this.A, p);
  return MyMath.areColinear(this.v, v);
}

Line.prototype.intersectCircle = function(c){
  var l = new Line({
    A:c.center,
    v:MyMath.ortho(this.v)
  });
  var p = this.intersectLine(l)[0];
  var d = MyMath.d(p, c.center);
  if(d > c.radius){
    return [];
  }
  if( MyMath.eq(d, c.radius)){
    return [p];
  }
  var a = Math.sqrt(Math.pow(c.radius,2) - Math.pow(d, 2));
  a = MyMath.scalVect(a, MyMath.norm(this.v));
  return [
    MyMath.sum(p, MyMath.scalVect(-1, a)), 
    MyMath.sum(p, MyMath.scalVect( 1, a))
  ];

}
module.exports = Line;