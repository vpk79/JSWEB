const url = require('url');
const fs = require('fs');
const path = require('path');

let mimes = {
    'css': 'text/css',
    'html': 'text/html',
    'js': 'text/javascript',
    'png': 'image/png'
}

function getContentType(url){
    console.log(url.endsWith());
   return mimes[url.endsWith];
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if(pathname.startsWith('/content') && req.method === 'GET'){
        fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
            if(err){
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Error was found');
                res.end();
                return;
            }

            console.log(pathname);
            res.writeHead(200, {
                'Content-Type': getContentType(pathname)
            });

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}