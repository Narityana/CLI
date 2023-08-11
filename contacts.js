const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		throw error;
	}
}

async function getContactById(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		return contacts.find(contact => contact.id === contactId) || null;
	} catch (error) {
		throw error;
	}
}

async function removeContact(contactId) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		const index = contacts.findIndex(contact => contact.id === contactId);

		if (index !== -1) {
			const removedContact = contacts.splice(index, 1)[0];
			await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
			return removedContact;
		} else {
			return null;
		}
	} catch (error) {
		throw error;
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = JSON.parse(data);
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		};
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
