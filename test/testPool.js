var rek = require('rekuire'),
  Pool = rek('Pool');
function T(a,b){this.a = a, this.b = b;}
T.prototype.value = function(){return this.a;}
T.prototype.toString = function(){return this.b;}

exports.get = function(test){
  var pool = new Pool();
  res = pool.get({value:function(){}});
  test.equal(typeof(res), 'undefined');
  var a = new T('a','test')
  var b = new T('a','test2')
  pool.store(a);
  test.equal(pool.get(b.value()).toString(), 'test');
  test.done();
}