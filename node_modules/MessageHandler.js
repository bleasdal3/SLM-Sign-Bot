module.exports.HandleMessage = function HandleMessage(message, dbConnect, client)
{
	//split params into array
	var MessageArray = message.split(" ");
	var result;

	//detect command based on first word
	switch(MessageArray[0])
	{
		case "BobbleHat": //truncate table
			Wipe(dbConnect);
			break;

		case "Add":
			result = CheckParams(MessageArray, dbConnect, client);
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


function CheckParams(MessageArray, dbConnect,client)
{
	var brokenCommand;

	switch(MessageArray[0])
	{	
		case "Add":
		{
			if(MessageArray.length == 4) //add -> ID -> Rank -> NickName
			{
					//vars in this scope have "_" to prevent confusion with dependecies
					var _ID = MessageArray[1];
					var _Rank = MessageArray[2];
					var _NickName = MessageArray[3];

				

					var members = client.guilds.get('578526874230194196').members;		
					var present = false;

					for(let[snowflake, guildmember] of members)
					{
						if(_ID == guildmember.user.id)
						{
							present = true;
						}						
					}	
					if(present == false)
					{
						return "ERROR: User Id is not found in this server.";
					}

					//for loop continues after this if found - I'm sure there is an easier way of doing this.
					if(_Rank != ("Recruit" || "Raider" || "Officer"))
					{
						return "ERROR: Incorrect rank input. Must be: Recruit, Raider or Officer";
					}
					//no check for nickname, guess we'll have to assume they'll get it right.
					//all good fort the DB query

					//var _query = "insert into `InitialTestTable` (`disc_id`, `NickName`, `GRank`) values ('" + _ID + "', '" + _NickName + "', '" + _Rank + "')";
					var _query = "insert into `InitialTestTable` (`disc_id`, `NickName`, `GRank`) values ('_ID', '_NickName', '_Rank')";

					dbConnect.query(_query, function(err, results)
					{
						if(err)
						{
							console.log(err);
							return "ERROR: Internal DB insert error. Check console.";
						}

					});

					return "Success. " + _NickName + " (" +  _Rank +  ") has been added.";
			}
			else 
			{
				return "ERROR: Incorrect number of arguments. The format is thus: Add ID Rank Name. For example: Add 1234567890 Recruit xXMargaret69ThatcherXx";
			}
		}
		

		default:
			return; //kinda pointless with a mirrored switch, but hey ho.
	}
}

function Wipe(dbConnect)
{
	dbConnect.query("truncate table InitialTestTable", function(err, result)
	{
		if(err)
			console.log(err);
		else
			console.log("Table truncated.");

	});
}


