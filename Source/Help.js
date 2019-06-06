module.exports.Help = function Help(channel)
{
	var commandList = 
	[
		'Signing: [Sign] [Day of the Week] [Day of the Month] [Month]. e.g: sign Wed 29 Sep',
		'Unsigning: [Unsign] [Day of the Week] [Day of the Month] [Month]. e.g: unsign Wed 29 Sep',
		'!Sheet: Returns a link to the google doc.'
	]

	for(var i = 0; i < commandList.length; i++)
	{
		channel.send(commandList[i]);
	}

	channel.send("More commands will be added as and when they are suggested and I have free time.");

}