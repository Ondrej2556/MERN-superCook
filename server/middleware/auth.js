var jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const protect = async (req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne({_id:decoded.id}).select("-password")
            next();
        } else {
            res.status(401)
            throw new Error('Not authorized')
        }

        if(!token) {
            res.status(403)
            throw new Error('No token')
        }
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

module.exports = protect;