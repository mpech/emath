var util = require('util'),
  rek = require('rekuire'),
	Axiome = rek('lib/axiomes/axiome'),
	MyMath = rek('lib/utils/MyMath');

function Circle(o){
	this.center = o.center;
	this.radius = o.radius;
  this.type = 'Circle'; //ugly use for reflection... todo check if .constructor.toString() is specced to keep track of constructor name
}
util.inherits(Circle, Axiome);
//http://mathworld.wolfram.com/Circle-CircleIntersection.html
Circle.prototype.intersectCircle = function(c){
	var d = MyMath.d(this.center, c.center),
		d2 = Math.pow(d,2),
		r2 = Math.pow(c.radius,2),
		R2 = Math.pow(this.radius, 2);

	if(d > c.radius + this.radius){
		return [];
	}
  
	var x = (d2 - r2 + R2 )/(2*d),
		a = Math.sqrt(4*d2*R2 - Math.pow(d2 - r2 + R2,2));

	if(MyMath.eq(a, 0)){
		return [P(x, a)];
	}
	return [MyMath.P(x, a/2), MyMath.P(x, -a/2)];
}
module.exports = Circle;