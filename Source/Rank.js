module.exports.Promote = function Promote(MessageArray, dbConnect, client, channel)
{	
	const Promises = require('./Promises'); 

	if(!LengthCheck(MessageArray))
	{
		channel.send("ERROR: Incorrect number of arguments. Format must be: [Promote] [Nickname | ID]");
		return;
	}

	var QueryCriteria = MessageArray[1];

	//this needs changing
	var _query = "select GRank from InitialTestTable where disc_id = '" + QueryCriteria + "'" + " limit 1";


	Promises.QueryDB(_query, dbConnect)
	.then(function(result)
	{
				//code depending on result.
				try
				{
					var temp = result[0].GRank;
					//resolved. Do update query

					switch(temp)
					{

						case 'Recruit':
						_query = "update InitialTestTable set GRank = 'Raider' where disc_id = '" + QueryCriteria + "'";
						break;	

						case 'Raider':
						_query = "update InitialTestTable set GRank = 'Officer' where disc_id = '" + QueryCriteria + "'";
						break;

						case 'Officer':
						//overflow/cascade/fallthrough?
						default:
						channel.send("ERROR: Cannot promote further.");
						return;
					}
					
					dbConnect.query(_query, function(err, results)
					{					
						if(err)
						{
							console.log(err);
							channel.send("ERROR: Internal DB insert error. Check console.");
							return;
						}

						channel.send("Successfully promoted.");
						return;					
					});

					return;
				}
				catch(err) //type resolution failure. No results returned so evaluation of result[0].NickName fails
				{
					//down the rabbit hole we go, time to search for Nickname

					_query = "select GRank from InitialTestTable where NickName = '" + QueryCriteria + "'" + " limit 1";

					Promises.QueryDB(_query, dbConnect)
					.then(function(result)
					{
						//code depending on result.
						try
						{
							var temp = result[0].GRank;
						//resolved. Do update query
						switch(temp)
						{
							case 'Recruit':
							_query = "update InitialTestTable set GRank = 'Raider' where NickName = '" + QueryCriteria + "'";
							break;	

							case 'Raider':
							_query = "update InitialTestTable set GRank = 'Officer' where NickName = '" + QueryCriteria + "'";
							break;

							case 'Officer':
							//overflow/cascade/fallthrough?
							default:
							channel.send("ERROR: Cannot promote further.");
							return;
						}

						dbConnect.query(_query, function(err, results)
						{					
							if(err)
							{
								console.log(err);
								channel.send("ERROR: Internal DB insert error. Check console.");
								return;
							}

							channel.send("Successfully promoted.");
							return;					
						});

						return;
					}
					catch(err) //type resolution failure. No results returned so evaluation of result[0].NickName fails
					{
						channel.send("ERROR: Could not find specified ID/User.");
						return;		
					}
				})
					.catch(function()
					{
						channel.send("ERROR: ToDO put proper error reporting here.");
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

module.exports.Demote = function Demote(MessageArray, dbConnect, client, channel)
{	
	const Promises = require('./Promises'); 

	if(!LengthCheck(MessageArray))
	{
		channel.send("ERROR: Incorrect number of arguments. Format must be: [Demote] [Nickname | ID]");
		return;
	}

	var QueryCriteria = MessageArray[1];

	//this needs changing
	var _query = "select GRank from InitialTestTable where disc_id = '" + QueryCriteria + "'" + " limit 1";


	Promises.QueryDB(_query, dbConnect)
	.then(function(result)
	{
				//code depending on result.
				try
				{
					var temp = result[0].GRank;
					//resolved. Do update query
					switch(temp)
					{
						case 'Officer':
						_query = "update InitialTestTable set GRank = 'Raider' where disc_id = '" + QueryCriteria + "'";
						break;	

						case 'Raider':
						_query = "update InitialTestTable set GRank = 'Recruit' where disc_id = '" + QueryCriteria + "'";
						break;

						case 'Recruit':
						//overflow/cascade/fallthrough?
						default:
						channel.send("ERROR: Cannot demote further.");
						return;
					}
					
					dbConnect.query(_query, function(err, results)
					{					
						if(err)
						{
							console.log(err);
							channel.send("ERROR: Internal DB insert error. Check console.");
							return;
						}
						channel.send("Successfully demoted.");
						return;					
					});

					return;
				}
				catch(err) //type resolution failure. No results returned so evaluation of result[0].NickName fails
				{
					//down the rabbit hole we go, time to search for Nickname

					_query = "select GRank from InitialTestTable where NickName = '" + QueryCriteria + "'" + " limit 1";

					Promises.QueryDB(_query, dbConnect)
					.then(function(result)
					{
						//code depending on result.
						try
						{
							var temp = result[0].GRank;
						//resolved. Do update query
						switch(temp)
						{
							case 'Officer':
							_query = "update InitialTestTable set GRank = 'Raider' where NickName = '" + QueryCriteria + "'";
							break;	

							case 'Raider':
							_query = "update InitialTestTable set GRank = 'Recruit' where NickName = '" + QueryCriteria + "'";
							break;

							case 'Recruit':
							//overflow/cascade/fallthrough?
							default:
							channel.send("ERROR: Cannot demote further.");
							return;
						}

						dbConnect.query(_query, function(err, results)
						{					
							if(err)
							{
								console.log(err);
								channel.send("ERROR: Internal DB insert error. Check console.");
								return;
							}

							channel.send("Successfully demoted.");
							return;					
						});

						return;
					}
					catch(err) //type resolution failure. No results returned so evaluation of result[0].NickName fails
					{
						channel.send("ERROR: Could not find specified ID/User.");
						return;		
					}
				})
					.catch(function()
					{
						channel.send("ERROR: ToDO put proper error reporting here.");
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

function LengthCheck(MessageArray)
{
	if(MessageArray.length < 2)
	{
		return false;
	}

	else if(MessageArray.length > 2)
	{
		return false;
	}

	else
	{
		return true;
	}
}


