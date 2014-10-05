var rek = require('rekuire'),
	Line = rek('lib/axiomes/line'),
  Circle = rek('lib/axiomes/circle'),
  MyMath = rek('lib/utils/MyMath')
exports.intersect = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  line2 = new Line({
    A:MyMath.P(0,2),
    v:MyMath.P(0,1)
  }),
  r = line.intersect(line2);
  test.ok(r instanceof Array);
  test.done();
}
exports.intersectSameLine = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  line2 = new Line({
    A:MyMath.P(0,2),
    v:MyMath.P(0,1)
  }),
  r = line.intersectLine(line2);
  test.equal(r.length, 1);
  test.ok(MyMath.eq(r[0], MyMath.P(0,2)));
  test.done();
};

exports.intersectColinearLine = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  line2 = new Line({
    A:MyMath.P(1,2),
    v:MyMath.P(0,1)
  }),
  r = line.intersectLine(line2);
  test.equal(r.length, 0);
  test.done();
};


exports.intersectSecantLine = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  line2 = new Line({
    A:MyMath.P(1,2),
    v:MyMath.P(1,0)
  }),
  r = line.intersectLine(line2);
  test.equal(r.length, 1);
  test.ok(MyMath.eq(r[0], MyMath.P(0,2)));
  test.done();
};

exports.intersectLineCircleOnePoint = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  circle = new Circle({
    center:MyMath.P(1, 1),
    radius:1
  }),
  r = line.intersect(circle);
  test.equal(r.length, 1);
  test.ok(MyMath.eq(r[0], MyMath.P(0,1)));
  test.done();
};
exports.intersectLineCircleTwoPoint = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  circle = new Circle({
    center:MyMath.P(0, 2),
    radius:1
  }),
  r = line.intersect(circle);
  test.equal(r.length, 2);
  test.ok(MyMath.eq(r[0], MyMath.P(0,1)));
  test.ok(MyMath.eq(r[1], MyMath.P(0,3)));
  test.done();
};

exports.intersectLineCircleNoPoint = function(test){
  var line = new Line({
    A:MyMath.P(0,0),
    v:MyMath.P(0,1)
  }),
  circle = new Circle({
    center:MyMath.P(2,2),
    radius:1
  }),
  r = line.intersect(circle);
  test.equal(r.length, 0);
  test.done();
};