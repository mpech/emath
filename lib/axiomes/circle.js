var util = require('util'),
  rek = require('rekuire'),
	Axiome = rek('lib/axiomes/axiome'),
	MyMath = rek('lib/utils/MyMath');

function Circle(o){
	this.center = o.center;
	this.radius = o.radius;
  this.type = 'Circle'; //todo check if .constructor.toString() is specced to keep track of constructor name
}
util.inherits(Circle, Axiome);
//http://mathworld.wolfram.com/Circle-CircleIntersection.html
Circle.prototype.intersectCircle = function(c){
	var d = MyMath.d(this.center, c.center),
		d2 = Math.pow(d,2),
		r2 = Math.pow(c.radius,2),
		R2 = Math.pow(this.radius, 2);

	if(d > c.radius + this.radius || d < this.radius || d < c.radius){
		return [];
	}
	var x = (d2 - r2 + R2 )/(2*d),
		y = Math.sqrt(R2 - Math.pow(x,2)),
    v = MyMath.v(this.center, c.center);

	if(MyMath.eq(y, 0)){
    var r = MyMath.sum(this.center, MyMath.scalVect(this.radius, MyMath.norm(v)));
		return [r];
	}
  var theta = Math.atan2(v[1], v[0]),
    localVector_1 = MyMath.rotate(MyMath.P(x,y), theta),
    localVector_2 = MyMath.rotate(MyMath.P(x,y), -theta),
    localVector_1 = MyMath.sum(this.center, localVector_1),
    localVector_2 = MyMath.sum(this.center, localVector_2);
    return [localVector_1, localVector_2];
}
module.exports = Circle;