var fs = require('fs'),
  grammarParser = require('grammarParser'),
  instructions = fs.readdirSync(__dirname).filter(function(x){
    return fs.statSync(__dirname+'/'+x).isDirectory();
  }).map(function(x){
     return require(__dirname+'/'+x);
  });
function concatGrams(commonGram, cbk){
  return fs.readFile(commonGram, function(err, data){
    if(err){
      throw err;
    }
    data = data.toString().replace('INSTRUCTIONS', instructions.map(function(x){
        return x.getGrammar();
      }).join('\n')
    ).split('\n').filter(function(x){
      return x.trim().length && x[0]!='#';
    }).join('\n');
    return cbk(null, data);
  })
}
function parseIt(gramStr, str, cbk){
  var nf = grammarParser.NodeFactory(),
    grammar=grammarParser.grammarFromString(gramStr),
    backOptions={left:str, nodeList:[]};
  instructions.forEach(function(x){
    x.registerTo(nf);
  });
  grammarParser.doPred(grammar, nf, 'instructionGroup', backOptions);
  var node = nf.applyFunc('master', backOptions.nodeList);
  cbk(null, node);
}
module.exports={
  concatGrams:concatGrams,
  parseIt:parseIt
};
