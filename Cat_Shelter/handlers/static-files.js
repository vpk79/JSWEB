
let mimes = {
    'css': 'text/css',
    'html': 'text/html',
    'js': 'text/javascript',
    'png': 'image/png'
}

function getContentType(url){
   return mimes[url.endsWith];
}