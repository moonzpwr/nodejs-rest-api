const User = require('./schemas/users')

const findByID = async (id) => {
    return await User.findOne({_id: id})
}

const findByEmail = async (email) => {
    return await User.findOne({email})
}

const create = async (userOptions) => {
    const user = new User(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.updateOne({_id: id}, {token})
}


const updateAvatar = async (id, avatar) => {
    return await User.updateOne({_id: id}, {avatar})
}

module.exports = {
    findByID,
    findByEmail,
    create,
    updateToken,
    updateAvatar
}