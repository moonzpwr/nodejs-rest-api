const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
const shortid = require('shortid');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const result = allContacts.find(({ id }) => id.toString() === contactId)
  return result
}

const removeContact = async (contactId) => {
  const data = await listContacts()
  const newList = data.filter(({ id }) => id.toString() !== contactId)
  if (data.find(({ id }) => id.toString() === contactId) === undefined){
    return
  }
  fs.writeFile(contactsPath, JSON.stringify(newList, 0, 2))
  return data.find(({ id }) => id.toString() === contactId)
}

const addContact = async (body) => {
  const id = shortid.generate()
  const record = {
    id,
    ...body
  }
  const allContacts = await listContacts()
  allContacts.push(record)
  fs.writeFile(contactsPath, JSON.stringify(allContacts, 0, 2))
  return record
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const contact = allContacts.find(({ id }) => id.toString() === contactId)
  // const record = Object.assign(contact, body)
  const record = {...contact, ...body}
  const newList = allContacts.filter(({ id }) => id.toString() !== contactId)
  if (record.id) {
    newList.push(record)
    fs.writeFile(contactsPath, JSON.stringify(newList, 0, 2))
    return record
  }
  return undefined
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
