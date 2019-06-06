module.exports.HandleMessage = function HandleMessage(message, info, client, channel, senderID)
{	
	const UpdateSheet = require('./UpdateSheet');
	const Help = require('./Help');

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

		case "/?":
		result = Help.Help(channel);
		break;

		case "!sheet":
		result = ParseSheetURL(channel);		
		break;

		default:
			result = "Invalid operation identifier. Please use the /? command for a list.";
	}
	return result;
}

function ParseSheetURL(channel)
{
	const fs = require('fs');
	fs.readFile('credentials.json', (err, content) => 
	{
  		if(err)
  		{
    		return console.log('Error loading client secret file:', err);
  		}
  		var creds = JSON.parse(content);
  		channel.send(creds.sheet);
  		return creds.sheet;
  	});
}

