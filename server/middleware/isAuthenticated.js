require('dotenv').config()
// Import json web token
const jwt = require('jsonwebtoken')
// Import secret from .env file. This will be added to tokens.
const {SECRET} = process.env

module.exports = {
    // Middleware that receives request and at the end will send user to next middleware with "next"
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        // If there is no header token, response will be sent back with error code
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET) // Verify incoming tokens 
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        // If token remains undefined or false, throw error
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next() // Once token is verified, request will move to next middleware function
    }
}