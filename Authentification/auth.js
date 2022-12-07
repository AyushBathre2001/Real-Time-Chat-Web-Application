const jwt = require('jsonwebtoken')
const Register = require('../function')


const auth = async (req,res,next)=>{
    try {
        const cookieToken = req.cookies.jwt 
        const verifyToken = jwt.verify(cookieToken,"welcometotheauthenticateprotocol")
        const user = await Register.findOne({_id:verifyToken._id})
        req.user = user
        req.token = cookieToken
        next()

        
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth