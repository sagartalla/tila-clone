const net = require('net');
const MSGS = require("./mockData.json");

const config = {
    'host':'127.0.0.1',
    'port':3002,
}

Object.flatten = (data) =>{
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}

Object.unflatten = (data) => {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
};

net.createServer((sock) => {

    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    var count = 0;
    var msgs = MSGS.data;
  
    sock.on('data', (data) => {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        sock.write('You said : "' + data + '"');
        myFunction(count);
    });

    sock.on('close', (data) => {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

    function myFunction(){
        if(count < msgs.length){
            console.log(JSON.stringify(Object.flatten(msgs[count])));
            sock.write(JSON.stringify(Object.flatten(msgs[count])));
            count = count+1;
        }
    }

    setInterval(() =>{
        myFunction();
    }, 10000);


}).listen(config.port, config.host);

console.log('Server listening on ' + config.host +':'+ config.port);

