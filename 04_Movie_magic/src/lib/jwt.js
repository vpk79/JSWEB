const util = require('util');
const jwt = require('jsonwebtoken');

// пресъздаваме функцията sign - jwt.sign - понеже е синхронна, за да си направим асинхронна такава, която да връща promise


function sign(payload, secretOrPrivateKey, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        })
    })

    return promise;
}

// util promisify ще вземе verify функцията и ще я обърне във вариант с промиси
const verify = util.promisify(jwt.verify);


module.exports = {
    sign,
    verify
}