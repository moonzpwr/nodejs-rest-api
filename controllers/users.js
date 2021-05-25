const Users = require('../model/users')
const { HttpCode } = require('../helper/constans')
const EmailService = require('../services/email')
const jwt = require('jsonwebtoken')
const User = require('../model/schemas/users')
require('dotenv').config()
const JWT_SECRET_KEY  = process.env.JWT_SECRET_KEY 

const reg = async (req, res, next) => {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: "Email in use"
        })
    }
    try {
        const newUser = await Users.create(req.body)
        const {id, name, email, verifyTokenEmail} = newUser
        try {
            const emailService = new EmailService(process.env.NODE_ENV)
            await emailService.sendVerifyEmail(verifyTokenEmail, email, name)
        } catch (e) {
            console.log(e.message);
        }
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                id,
                email,
            }
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword || !user.verify) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: "Email or password is wrong"
        })
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(user.id, token)
    return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {token}
        })
}

const logout = async (req, res, next) => {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const current = async (req, res, next) => {
    const id = req.user.id
    const {email, subscription} = await Users.findByID(id)
    return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {email, subscription}
        })
}

const verify = async (req, res, next) => {
try {
    const user = await Users.findByVerifyTokenEmail(req.params.token)
    if (user) {
        await Users.updateVerifyToken(user.id, true, null)
          return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {message: 'Verification successful'}
        })
    }
       return res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: "Your verification token is not valid"
        })
} catch (e) {
    next(e)
}
}

const repeatEmailVerify = async (req, res, next) => {
try {
    const user = await Users.findByVerifyTokenEmail(req.params.token)
    if (user) {
        const {name, verifyTokenEmail, email} = user 
            const emailService = new EmailService(process.env.NODE_ENV)
        await emailService.sendVerifyEmail(verifyTokenEmail, email, name)
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {message: 'Verification email resubmitted'}
        })
    }
    return res.status(HttpCode.NOT_FOUND).json({
            status: 'error',
            code: HttpCode.NOT_FOUND,
            message: "user not found"
        })
} catch (e) {
    next(e)
}
}


module.exports = {
    reg,
    login,
    logout,
    current,
    verify,
    repeatEmailVerify

}