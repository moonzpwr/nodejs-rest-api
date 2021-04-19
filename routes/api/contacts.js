const express = require('express')
const router = express.Router()
// const fs = require('fs/promises')
// const path = require('path')
const {listContacts, getContactById, removeContact, addContact, updateContact,} = require('../../model/index.js')
const {validationCreateContact, validationUpdateContact} = require('./valid-contacts-router.js')

router.get('/', async (req, res, next) => {
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
})


router.get('/:contactId', async (req, res, next) => {
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
})

router.post('/', validationCreateContact, async (req, res, next) => {
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
  
})

router.delete('/:contactId', async (req, res, next) => {
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
})

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    if (req.body) {
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
    } else {
        res.status(400).json({
          status: 'error',
          code: 400,
          message: "missing fields"
        })
    }
    
  } catch (error) {
    next(error)
  }
})

module.exports = router
