module.exports.Add = function Add(MessageArray, dbConnect, client, channel)
{	
	const Promises = require('./Promises'); 

	if(MessageArray.length == 4) //add -> ID -> Rank -> NickName
	{
		//vars in this scope have "_" to prevent confusion with dependecies
		var _ID = MessageArray[1];
		var _Rank = MessageArray[2];
		var _NickName = MessageArray[3];
		var _query = "";			
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
			channel.send("ERROR: User Id is not found in this server.")									
			return;
		}

			//check to see if already in the DB!
			_query = "select NickName from InitialTestTable where disc_id = '" + _ID + "'";

			Promises.QueryDB(_query, dbConnect)
			.then(function(result)
			{
					//code depending on result.
					try
					{
						channel.send("ERROR: User already exists under the Nickname " + result[0].NickName + ".");
						return;
					}
					catch(err) //type resolution failure. No results returned so evaluation of result[0].NickName fails
					{

						if((_Rank != "Recruit") && (_Rank != "Raider") && (_Rank != "Officer"))
						{
							channel.send( "ERROR: Incorrect rank input. Must be: Recruit, Raider or Officer");
							return;
						}
						//no check for nickname, guess we'll have to assume they'll get it right.
						//all good for the DB query

						_query = "insert into `InitialTestTable` (`disc_id`, `NickName`, `GRank`) values ('" + _ID + "', '" + _NickName + "', '" + _Rank + "')";
						//_query = "insert into `InitialTestTable` (`disc_id`, `NickName`, `GRank`) values ('_ID', '_NickName', '_Rank')";

						dbConnect.query(_query, function(err, results)
						{					
							if(err)
							{
								console.log(err);
								channel.send("ERROR: Internal DB insert error. Check console.");
								return;
							}

							channel.send("Success. " + _NickName + " (" +  _Rank +  ") has been added.");
							return;					
						});									
					}
				})
			.catch(function()
			{
				channel.send("ERROR: ToDO put proper error reporting here.");
				return;
			});
		}
		else 
		{
			return "ERROR: Incorrect number of arguments. The format is thus: Add ID Rank Name. For example: Add 1234567890 Recruit xXMargaret69ThatcherXx";
		}
	}

module.exports.Remove = function Remove(MessageArray, dbConnect, client, channel)
{
	if(MessageArray.length == 2) //Kick -> NickName
	{
		//vars in this scope have "_" to prevent confusion with dependencies
		var _NickName = MessageArray[1];
		var _query = "";			
		var members = client.guilds.get('578526874230194196').members;		
		var present = false;

		/*for(let[snowflake, guildmember] of members)
		{
			if(_ID == guildmember.user.id)
			{
				present = true;
			}						
		}	*/

		/*if(present == false)
		{		
			channel.send("ERROR: User Id is not found in this server.")									
			return;
		}*/
			_query = "delete from InitialTestTable where NickName = '" + _NickName + "' limit 1";

			dbConnect.query(_query, function(err, results)
						{			
							if(err)
							{
								console.log(err);
								channel.send("ERROR: Internal DB insert error. Check console. Or " + _NickName + "doesn't exist to be kicked!.");
								return;
							}

							else if(results.affectedRows == 0)
							{
								channel.send("ERROR: " + _NickName + " was not found in the DB.");
								return;
							}
							else
							{
								channel.send("Success. " + _NickName + " has been kicked.");
								return;	
							}								
						});		
		}
		else 
		{
			return "ERROR: Incorrect number of arguments. The format is thus: Add ID Rank Name. For example: Add 1234567890 Recruit xXMargaret69ThatcherXx";
		}
}
