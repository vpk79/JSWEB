const http = require('http');
const port = 3000;
const handlers = require('./handlers');

http.createServer((req, res) => {
    
    // console.log(handlers);

    for(let handler of handlers){
        if(!handler(req, res)){
            console.log('no handler error');
            break;
        }
    }
    
}).listen(port);

console.log('Server is working at port 3000...');