const {body} = require('express-validator');
const userRegister = [
    body('name')
    .trim()
    .isEmpty()
    .isLength({min:3,max:25})
    .withMessage('name is required'),
    body('email')
    .isEmail()
    .withMessage('valid email is required'),
     body('password')
    .trim()
    .isEmpty()
    .isLength({min:6,max:25})
    .withMessage('password is required')
]
module.exports ={
    userRegister
}