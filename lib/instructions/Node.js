var grammarParser = require('grammarParser');
function Node(name, nodeList){
  grammarParser.Node.call(this, name, nodeList);
}
module.exports=Node;