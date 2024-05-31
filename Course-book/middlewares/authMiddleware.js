exports.authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if(!token){
        next();
    }
}