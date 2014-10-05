var eps = 1e-10;
function d(x,y){
	return Math.sqrt(scal(v(x,y),v(x,y)));
}
function v(x,y){
	return x.map(function(b,i){
		return y[i] - b;
	});
}
function scal(x,y){
  if(typeof(x)=='number'){
    throw 'expect both arrays'
  }
  var r = 0;
  for(var i = 0; i < x.length; ++i){
    r += x[i]*y[i];
  }
  return r;
}
function scalVect(x,y){
	return y.map(function(a){
		return x*a;
	});
}
function sum(x,y){
  var z = x.slice(0);
  for(var i = 0; i < x.length; ++i){
    z[i] = x[i] + y[i];
  }
  return z;
}
function areColinear(x,y){
	var x = norm(x),
		y = norm(y);

	return eq(norm(x), norm(y));
}
function cross(a,b){//BEWARE 2D only...
	return a[0]*b[1] - a[1] * b[0];
}
function eq(a,b){
  if(a instanceof Array){
    return !a.some(function(x, i){
      return !eq(x, b[i]);
    });
  }
	return Math.abs(a - b) < eps;
}
function P(){
	return Array.prototype.slice.call(arguments, 0);
}
function isZero(x){
  return eq(x, scalVect(0, x));
}
function norm(x){
  if(isZero(x)){
    return x;
  }
  return scalVect(1/Math.sqrt(scal(x,x)), x);
}
function ortho(x){
  var r = x.slice(0);
  r[0] = x[1];
  r[1] = -x[0];
  for(var i = 2; i < r.length; ++i){
    r[i] = 0;
  }
  return r;
}
function rotate(p, theta){//BEWARE 2D only...
  var a = Math.cos(theta),
    b = Math.sin(theta);
  var r = p.slice(0);
  r[0] = scal(P(a, -b), p);
  r[1] = scal(P(b,  a), p);
  return r;
}
module.exports={
	d:d,
	v:v,
	scal:scal,
	scalVect:scalVect,
	sum:sum,
	areColinear:areColinear,
	cross:cross,
	eq:eq,
  isZero:isZero,
  norm:norm,
	P:P,
  ortho:ortho,
  rotate:rotate
}