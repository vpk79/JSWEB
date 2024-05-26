const jwt = require('jsonwebtoken');

// пресъздаваме функцията sign - jwt.sign - понеже е синхронна, за да си направим асинхронна такава, която да връща promise


function sign(payload, secretOrPrivateKey, options = {}){
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token)=> {
            if(err){
               return reject(err);
            }

            resolve(token); 
        })
    })

    return  promise;
}


module.exports = {
    sign,
}