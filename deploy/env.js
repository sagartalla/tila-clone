console.log('1', process.env.ENV);
if(!process.env.ENV) {
  try {
    var fs = require("fs");
    var data = fs.readFileSync('/code/ecs/environment.txt');
    var temp = data.toString();
    var arr = temp.split("=");
    var env = arr[1]
    process.env.ENV = env;
    console.log('2', process.env.ENV);
  } catch (e) {
    console.log('ERROR reading FILE');
    process.env.ENV = 'preprod';
  }
}
module.exports = {};
