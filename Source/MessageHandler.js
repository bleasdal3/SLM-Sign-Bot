module.exports.HandleMessage = function HandleMessage(message, dbConnect, client, channel)
{	
	const AddUser = require('./AddUser');
	const Wipe = require('./Wipe');
	const Rank = require('./RankChange');

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

		case "Promote":
			result = Rank.Promote(MessageArray, dbConnect, client, channel)
			break;

		default:
			result = "Invalid operation identifier. Please use the /? command for a list.";
	}

	return result;

}

