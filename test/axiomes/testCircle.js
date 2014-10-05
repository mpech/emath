var rek = require('rekuire'),
	Line = rek('lib/axiomes/line'),
  Circle = rek('lib/axiomes/circle'),
  MyMath = rek('lib/utils/MyMath')

exports.intersectCircleCircleOnePoint = function(test){
  var c1 = new Circle({
    center:MyMath.P(0, 0),
    radius:1
  }),
  c2 = new Circle({
    center:MyMath.P(0, 2),
    radius:1
  }),
  r = c1.intersect(c2);
  test.equal(r.length, 1);
  test.ok(MyMath.eq(r[0], MyMath.P(0,1)));
  test.done();
};

exports.intersectCircleCircleTwoPoint = function(test){
  var c1 = new Circle({
    center:MyMath.P(0, 0),
    radius:2
  }),
  c2 = new Circle({
    center:MyMath.P(2, 2),
    radius:2
  }),
  r = c1.intersect(c2);
  test.equal(r.length, 2);
  test.ok(MyMath.eq(r[0], MyMath.P(0,2)));
  test.ok(MyMath.eq(r[1], MyMath.P(2,0)));
  test.done();
};
exports.intersectCircleCircleNoPoint = function(test){
  var c1 = new Circle({
    center:MyMath.P(0, 0),
    radius:2
  }),
  c2 = new Circle({
    center:MyMath.P(10, 10),
    radius:2
  }),
  r = c1.intersect(c2);
  test.equal(r.length, 0);
  test.done();
};