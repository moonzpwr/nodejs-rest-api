const Contacts = require('./schemas/contacts')

const listContacts = async () => {
  const results = await Contacts.find()
  return results
}

const getContactById = async (contactId) => {
  const result = await Contacts.findOne({_id: contactId})
  return result
}

const removeContact = async (contactId) => {
  const result = await Contacts.findByIdAndRemove({_id: contactId})
  return result
}

const addContact = async (body) => {
  try {
    const result = await Contacts.create(body)
    return result
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400
    }
    throw e
  }
}

const updateContact = async (contactId, body) => {
  const result  = await Contacts.findByIdAndUpdate({ _id: contactId }, {...body}, {new: true})
  return result
}

const updateStatusContact = async (contactId, body) => {
  const result  = await Contacts.findByIdAndUpdate({ _id: contactId }, {...body}, {new: true})
  return result
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
