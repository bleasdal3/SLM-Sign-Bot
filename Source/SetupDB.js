
module.exports.Setup = function Setup(dbConnect)
{
	console.log("Looking For/Creating DB.");

	dbConnect.query("create database if not exists InitialTestDB", function(err, result)
	{
		if(err)
		{
			throw err;
		}
	
		console.log("DB found/created.");

		dbConnect.query("use InitialTestDB", function(err, result)
		{
			console.log("Looking for existing table.");

			let CreateTable = `create table if not exists InitialTestTable(
							id int primary key auto_increment, 
							disc_id varchar(255) not null, 
							NickName varchar(255) not null default 'Unknown!', 
							GRank varchar(255) not null default 'Recruit', 						
							Attendance tinyint(1) default 0, 
							Signed boolean default 0)`;


			dbConnect.query(CreateTable, function(err, results) 
			{
    			if (err) 
    			{
      				console.log(err.message);
    			}

    			console.log("Table found/created.");
  			});
  		});
	});
}

