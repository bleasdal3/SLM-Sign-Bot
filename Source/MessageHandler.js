module.exports.HandleMessage = function HandleMessage(message, dbConnect, client, channel)
{	
	const AddUser = require('./AddUser');
	const Wipe = require('./Wipe');

	//split params into array
	var MessageArray = message.split(" ");
	var result;

	//detect command based on first word
	switch(MessageArray[0])
	{
		case "BobbleHat": //truncate table
			Wipe.Quickly(dbConnect);
			result = "Table dropped.";
			break;

		case "Add":
			result = AddUser.Add(MessageArray, dbConnect, client, channel);
			break;

		default:
		result = "Invalid operation identifier. Please use the /? command for a list.";
	}

	//handle "add" command
	//add must be X array length long and have valid types
	//have independant Check params function function 
	//CheckParams(add, [string]) -> switch on first param

	return result;

}

