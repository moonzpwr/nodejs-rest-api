const express = require('express')
const router = express.Router()
const {getAll, getById, deleteContact, update, updateFavorite, createContact} = require('../../controllers/contacts')
const { validationCreateContact, validationUpdateContact, validationUpdateFavorite } = require('./valid-contacts-router.js')
const guard = require('../../helper/guard')

router.get('/', guard, getAll)
router.post('/', guard, validationCreateContact, createContact)
router.get('/:contactId', guard, getById)
router.delete('/:contactId', guard, deleteContact)
router.patch('/:contactId', guard, validationUpdateContact, update)
router.patch('/:contactId/favorite', guard, validationUpdateFavorite, updateFavorite) 
  

module.exports = router
