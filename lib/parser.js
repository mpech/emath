var fs = require('fs'),
  grammarParser = require('grammarParser'),
  instructionDirectory = __dirname+'/instructions/',
  globalNodesDirectory = __dirname+'/globalNodes/',
  instructions = fs.readdirSync(instructionDirectory).filter(function(x){
    return fs.statSync(instructionDirectory+x).isDirectory();
  }).map(function(x){
     return require(instructionDirectory+x);
  }),
  globalNodes = fs.readdirSync(globalNodesDirectory).map(function(x){
    return require(globalNodesDirectory+x);
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
  instructions.concat(globalNodes).forEach(function(x){
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
