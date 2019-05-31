module.exports.HandleMessage = function HandleMessage(message, info, client, channel, senderID)
{	
	//const User = require('./User');
	//const Wipe = require('./Wipe');
	//const Rank = require('./Rank');
	const UpdateSheet = require('./UpdateSheet');

	//split params into array
	var messageArray = message.split(" ");
	var result;
	messageArray[0] = messageArray[0].toLowerCase();

	//detect command based on first word
	switch(messageArray[0])
	{
		case "sign":		
		result = UpdateSheet.EditCell(messageArray, info, 'A', senderID);
		break;

		case "unsign":
		result = UpdateSheet.EditCell(messageArray, info, 'N', senderID);
		break;

		/*case "BobbleHat": //truncate table
			Wipe.Quickly(dbConnect);
			result = "Table dropped.";
			break;()*/

		/*case "Add":
			result = User.Add(MessageArray, client, channel);
			break;*/

		/*case "Kick":
			result = User.Remove(MessageArray, dbConnect, client, channel);
			break;*/

		/*case "Promote":
			result = Rank.Promote(MessageArray, dbConnect, client, channel);
			break;*/

		/*case "Demote":
			result = Rank.Demote(MessageArray, dbConnect, client, channel);
			break;*/


		default:
			result = "Invalid operation identifier. Please use the /? command for a list.";
	}

	return result;


}

