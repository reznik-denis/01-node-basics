const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    };

    const contacts = JSON.parse(data);
    
    console.log(`==============Contact List================`);
    console.table(contacts);
  })
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    };

    const contacts = JSON.parse(data);
    
    const contactById = contacts.find(contact => {
      if (contact.id === contactId) {
        console.log(`Contact by id ${contactId}:`, contact);
        return contact;
      }
    })

    if (!contactById) {
      console.log(`Contact with id ${contactId} doesn't exist`)
      return
    }
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    };

    const contacts = JSON.parse(data);
    const newContacts = contacts.filter(contact => contact.id !== contactId);

    if (newContacts.length === contacts.length) {
      console.log(`Contact with id ${contactId} not found!`);
      return
    }

    console.log(`Contact with id ${contactId} was removed. New contacts list:`);
    console.table(newContacts)
    
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) {
      console.log(err.message)
      return
    };
    })
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message)
      return
    };

    const contacts = JSON.parse(data);
    const newContact = {
      id: shortid(),
      name,
      email,
      phone
    };

    let wasAdd = false;

    contacts.map(contact => {
      if (contact.name === name) {
        console.log(`This name is allready add!`);
        wasAdd = true;
        return;
      } else if (contact.email === email) {
        console.log(`This email is allready add!`);
        wasAdd = true;
        return;
      } else if (contact.phone === phone) {
        console.log(`This phone is allready add!`);
        wasAdd = true;
        return
      }
    })

    if (wasAdd) {
      return
    }

    contacts.push(newContact)

    console.log(`New contacts was add to other: `)
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
      console.log(err.message)
      return
    };
    })
  })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}