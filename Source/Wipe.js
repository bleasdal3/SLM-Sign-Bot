module.exports.Quickly = function Quickly(dbConnect)
{
	dbConnect.query("truncate table InitialTestTable", function(err, result)
	{
		if(err)
			console.log(err);
		else
			console.log("Table truncated.");
	});
}