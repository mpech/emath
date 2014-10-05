var rek = require('rekuire'),
  MyMath = rek('lib/utils/MyMath')

exports.d = function(test){
  var A = MyMath.P(0,0),
    B = MyMath.P(0,2);
  test.ok(MyMath.eq(MyMath.d(A,B),2));
  test.ok(!MyMath.eq(MyMath.d(A,B),3));
  test.done();
};
exports.v = function(test){
  var A = MyMath.P(0,0),
    B = MyMath.P(0,2);
  test.ok(MyMath.eq(MyMath.v(A,B), MyMath.P(0, 2)));
  test.done();
};
exports.scal = function(test){
  var A = MyMath.P(1,4),
    B = MyMath.P(3,2);

  test.equal(MyMath.scal(A, B), 11);
  test.done();
};
exports.scalVect = function(test){
  var a = 4,
    B = MyMath.P(3,2);
  test.ok(MyMath.eq ( MyMath.scalVect(a, B), MyMath.P(12, 8)));
  test.done();
};
exports.sum = function(test){
  var A = MyMath.P(1,4),
    B = MyMath.P(3,2);
  test.ok(MyMath.eq ( MyMath.sum(A, B), MyMath.P(4, 6)));
  test.done();
};
exports.isZero = function(test){
  var A = MyMath.P(1,4),
    B = MyMath.P(0,0);
  test.ok(!MyMath.isZero(A));
  test.ok(MyMath.isZero(B));
  test.done();
}
exports.cross = function(test){
  var A = MyMath.P(1,4),
    B = MyMath.P(3,2);
  test.ok(MyMath.eq ( MyMath.cross(A, B), -10));
  test.done();
};
exports.norm = function(test){
  var A = MyMath.P(2, 2),
    a = Math.sqrt(2)/2;
  test.ok(MyMath.eq ( MyMath.norm(A, A), MyMath.P(a,a)));
  test.done();
}
exports.areColinear = function(test){
  var A = MyMath.P(1,4),
    B = MyMath.P(3,2);
  test.ok(!MyMath.areColinear(A,B));
  test.ok(MyMath.areColinear(A, A));
  test.done();
};
exports.ortho = function(test){
  var A = MyMath.P(1,4),
    O = MyMath.ortho(A);
  test.ok(MyMath.eq (MyMath.scal(A, O), 0) ) ;
  test.ok(!MyMath.eq (MyMath.scal(A, A), 0) ) ;
  test.done();
};
exports.rotate = function(test){
  var A = MyMath.P(1,2),
    O = MyMath.rotate(A, Math.PI/2);
  test.ok(MyMath.eq (O, MyMath.P(-2, 1)));
  test.done();
};