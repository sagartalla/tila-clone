const net      = require('net');
const client   = new net.Socket();

const MERCHANDISE =  require('./config/serverConfig.json');

client.setNoDelay(true);

Object.unflatten = (data) =>{
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

const connectToMerchandise = () => {
    client.connect(MERCHANDISE.SERVER.PORT, MERCHANDISE.SERVER.HOST);
};
connectToMerchandise();


client.once('connect', function(){
    console.log("CONNECTED TO MERCHANDISE @ Host ::" + MERCHANDISE.SERVER.HOST + ":" +MERCHANDISE.SERVER.PORT)
    client.write('Client Listening on : ' + MERCHANDISE.SERVER.PORT +"\n");
});

// client.on('data',(data)=>{
//     try{
//         var str = data.toString('utf8');
//         var jobj =  JSON.parse(str);
//         var unflattened =  Object.unflatten(jobj);
//         //console.log(Object.unflatten(JSON.parse(data.toString('utf8'))));
//         console.log(JSON.stringify(unflattened));
//     }
//     catch(e){
//         console.log('err :', e);
//     }
// })

client.on('close', () => {
    console.log('Client closed : Destroy status :'+ client.destroyed);
});

client.on('error', (err) => {

    console.log("Server Error ::: " + err.code);
    console.error(err);
    console.log("+++++ Error Description End +++++");
    
    /*if(err.code == 'ECONNREFUSED' || err.code == 'EPIPE') {
        console.log('Waiting for 5 seconds to reconnect to port:' + ASTERIX.SERVER.PORT + ' again');
        setTimeout(connectToMerchandise,5000)
    }*/
});

module.exports = client;

