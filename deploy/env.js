console.log('1', process.env.ENV);
if(!process.env.ENV) {
  var fs = require("fs");
  var data = fs.readFileSync('/code/ecs/environment.txt');
  var temp = data.toString();
  var arr = temp.split("=");
  var env = arr[1]
  process.env.ENV = env;
  console.log('2', process.env.ENV);
}
module.exports = {};
