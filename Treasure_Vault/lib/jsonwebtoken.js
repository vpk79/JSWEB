const util = require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign); // превръщаме синхронните функции в асинхронни с промиси
const verify = util.promisify(jwt.verify);


module.exports = {
    sign, 
    verify
}