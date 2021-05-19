const {listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact} = require('../model/index.js')

const getAll = async (req, res, next) => {
  try {
    const data = await listContacts()
    return res.json({
      status: 'success',
      code: 200,
      contacts: data
    })
  } catch (error) {
    next(error)
  }
}


const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await getContactById(id)
    if (contact) {
      res.json({
        status: 'success',
      code: 200,
      contact: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: "Not Found"
      })
    }
  } catch (error) {
    next(error)
  }
}
const createContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      contact: contact
    })
  } catch (error) {
    next(error)
  }
  
}

const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        contact: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: "Not Found"
      })
    }
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        contact: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: "Not Found"
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateFavorite =  async(req, res, next) => {
  try {
    const contact = await updateStatusContact(req.params.contactId, req.body)
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        contact: contact
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: "Not Found"
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
    getAll,
    getById,
    createContact,
    update,
    deleteContact,
    updateFavorite,
}