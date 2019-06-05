module.exports.HandleMessage = function HandleMessage(message, info, client, channel, senderID)
{	
	//const User = require('./User');
	//const Wipe = require('./Wipe');
	//const Rank = require('./Rank');
	const UpdateSheet = require('./UpdateSheet');

	//split params into array
	var messageArray = message.split(" ");
	var result;

	for(var i = 0; i < messageArray.length; i++)
	{
		messageArray[i] = messageArray[i].toLowerCase();
	}
	
	//detect command based on first word
	switch(messageArray[0])
	{
		case "sign":		
		result = UpdateSheet.EditCell(messageArray, info, 'A', senderID, channel);
		break;

		case "unsign":
		result = UpdateSheet.EditCell(messageArray, info, 'N', senderID, channel);
		break;

		default:
			result = "Invalid operation identifier. Please use the /? command for a list.";
	}
	return result;
}

