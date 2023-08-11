const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contactsList = await listContacts();
			console.table(contactsList);
			break;

		case "get":
			const findContact = await getContactById(id);
			console.log(findContact);
			break;

		case "add":
			const newContact = await addContact(name, email, phone);
			console.log(newContact);
			break;

		case "remove":
			const deletedContact = await removeContact(id);
			console.log(deletedContact);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);