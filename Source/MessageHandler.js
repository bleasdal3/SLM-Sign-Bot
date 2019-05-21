module.exports.HandleMessage = function HandleMessage(message, dbConnect, client, channel)
{	
	const User = require('./User');
	const Wipe = require('./Wipe');
	const Rank = require('./Rank');

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
			result = User.Add(MessageArray, dbConnect, client, channel);  //is there a struct variant I can use instead of repeated params?
			break;

		case "Remove":
			result = User.Remove(MessageArray, dbConnect, client, channel);

		case "Promote":
			result = Rank.Promote(MessageArray, dbConnect, client, channel);
			break;

		case "Demote":
			result = Rank.Demote(MessageArray, dbConnect, client, channel);
			break;

		default:
			result = "Invalid operation identifier. Please use the /? command for a list.";
	}

	return result;

}

