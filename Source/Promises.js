module.exports.QueryDB = function QueryDB(query, dbConnect)
{
	return new Promise(function(resolve, reject)
		{
			dbConnect.query(query, function(err, rows)
			{
				if(err)
				{
					return reject(err);
				}
				resolve(rows);
			});
		});
}

