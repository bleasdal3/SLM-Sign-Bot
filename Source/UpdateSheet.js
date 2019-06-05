module.exports.EditCell = function EditCell(messageArray, info, inputSwitch, senderID, channel)
{
	var sheet = info.worksheets[0];
	var result = "";

	switch(inputSwitch)
	{
		case 'A': //signed
		result = Sign(messageArray, sheet, senderID, channel);		
		break;

		case 'N': //not signed
		result = Unsign(messageArray, sheet, senderID, channel);
		break; 

		default: //no valid param
		throw err;
	}
	return result;
}

function Sign(messageArray, sheet, senderID, channel)
{
	if(messageArray.length == 4) //Sign -> Day -> Number -> Month
	{
		if((messageArray[1].length > 3) || (messageArray[3].length > 3))
		{
			return "ERROR: Invalid input. Please use this format: Sign Wed 04 Sep";
		}

		//get rows
		sheet.getRows({limit: 35}, function(err, rows)
		{
			var signDate = ManipulateDateFormat(messageArray);

			

			//search rows
			for(var i = 0; i < rows.length; i++)
			{
				if(rows[i].id == senderID) //find ID in rows
				{
					var keyArray = Object.keys(rows[i]);
					for(var x = 0; x < (Object.keys(rows[i])).length; x++) 
					{	
						if(keyArray[x] == signDate) //find date in row
						{				;
							var foundX = x; //the for loop keeps iterating as getCells is async.								

							sheet.getCells({'min-row' : (i+2), //the indexes are strange
											'max-row' : (i+2), 
											'return-empty' : true}
											, function(err, cells)
											{
												var cell = cells[foundX - 3]; //x = 9 but col num is 6? and recorded as 7?
												cell.value = 'A';
												cell.save(function(err)
												{													
													channel.send("Signed!");
												});
											});
						}
					}					
				}
			}
		});

	}
	else
	{
		return "ERROR: Invalid Input. The accepted format is - [Sign] [Day of the Week] [Day Number] [Month]";
	}

}

function CheckIfHistoric()
{
	return false;
}

function Unsign(messageArray, sheet, senderID, channel)
{
	if(messageArray.length == 4) //Unsign -> Day -> Number -> Month
	{
		if((messageArray[1].length > 3) || (messageArray[3].length > 3))
		{
			return "ERROR: Invalid input. Please use this format: Unsign Wed 04 Sep";
		}

		//get rows
		sheet.getRows({limit: 35}, function(err, rows)
		{
			var signDate = ManipulateDateFormat(messageArray);

			//search rows
			for(var i = 0; i < rows.length; i++)
			{
				if(rows[i].id == senderID) //find ID in rows
				{
					var keyArray = Object.keys(rows[i]);
					for(var x = 0; x < (Object.keys(rows[i])).length; x++) 
					{	
						if(keyArray[x] == signDate) //find date in row
						{				;
							var foundX = x; //the for loop keeps iterating as getCells is async.								

							sheet.getCells({'min-row' : (i+2), //the indexes are strange
											'max-row' : (i+2), 
											'return-empty' : true}
											, function(err, cells)
											{
												var cell = cells[foundX - 3]; //x = 9 but col num is 6? and recorded as 7?
												cell.value = 'N';
												cell.save(function(err)
												{													
													channel.send("Unsigned!");
												});
											});
						}
					}					
				}
			}
		});

	}
	else
	{
		return "ERROR: Invalid Input. The accepted format is - [Unsign] [Day of the Week] [Day Number] [Month]";
	}
}

function ManipulateDateFormat(messageArray)
{
	//strip first, change order and trim spaces of second
	var returned = messageArray[1]+messageArray[2]+messageArray[3];
	return returned;
}

module.exports.StartUp = function StartUp(info)
{	
	var userSheet = info.worksheets[1];
	var statsSheet = info.worksheets[0];
	//wipe spreadsheet, think about crash recovery at some point in the future
	statsSheet.clear(function(err)
	{
		var dates = ['Name', 'Id','Rank'];	

		//set column headers
		statsSheet.setHeaderRow(dates, function(err)
		{
			console.log('Sheet reset for startup. Copying data from user sheet.');
			userSheet.getRows(function(err, rows)			
			{

				for(var i = 0; i < rows.length; i++)
				{			
					statsSheet.addRow(
					{
      					worksheet_id:1,
      					new_row:{
       					Name: rows[i].name,
      					ID: rows[i].id,
      					Rank: rows[i].rank
    				}
    			},()=>
    				{
						//Add rest of the column headers
						var temp = GetDateBlock();
						for(var i = 0; i < temp.length; i++)
						{
							/*
							Going to have to do some fiddling here because of the
							the way the excel api formats the inputs. String, no space
							and no symbols.
							*/
							dates.push(temp[i]);
						}
						
					});
				}
				statsSheet.setHeaderRow(dates, function(err)
				{
					//think that's it?
					if(err)
					{
						throw err;
					}
				});			
			});
		});
	});	
}

function GetDateBlock()
{
	console.log("###########");
	var Today = new Date();
	var FutureDate = Today.addDays(62) //maximum days of two consecutive months, will trim to 8 weeks later.

	//first get arrays of dates for wednesday-sunday-monday

	var WednesdayDates = getDaysBetweenDates(Today, FutureDate, 'Wed');
	var SundayDates = getDaysBetweenDates(Today, FutureDate, 'Sun');
	var MondayDates = getDaysBetweenDates(Today, FutureDate, 'Mon');

	var combinedLength = WednesdayDates.length + SundayDates.length + MondayDates.length;
	 
	 //get them in order and trim the useless info
	 var dates = [];
	 var splitDate;
	 var wednesdayCount = 0;

	 for(var i = 0; i < combinedLength; i++)
	 {
	 	if(wednesdayCount == 8) //enforce 8 week max here. This prevents weird overflows with months with variable number of days
	 	{
	 		break;
	 	}
	 	try
	 	{
	 		var tempSplit = WednesdayDates[i].toString().split(' ');
	 		splitDate = tempSplit[0] +" " + tempSplit[2] + " " + tempSplit[1];	 		
	 		dates.push(splitDate);

	 		if(tempSplit[0] == 'Wed')
	 		{
	 			wednesdayCount++;
	 		}

	 		tempSplit = SundayDates[i].toString().split(' ');
	 		splitDate = tempSplit[0] + " " + tempSplit[2] + " " + tempSplit[1];
	 		dates.push(splitDate);

	 		tempSplit = MondayDates[i].toString().split(' ');
	 		splitDate = tempSplit[0] + " " + tempSplit[2] + " " + tempSplit[1];
	 		dates.push(splitDate);
	 	}
	 	catch(err)
	 	{
	 		break;
	 	}
	 }
	return dates;
}

function getDaysBetweenDates(start, end, dayName) {
 
  var result = [];
  var days = {sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6};
  var day = days[dayName.toLowerCase().substr(0,3)];

  // Copy start date
  var current = new Date(start);

  // Shift to next of required days
  current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
  // While less than end date, add dates to result array

  while (current < end) {
    //result.push(new Date(+current));
     result.push(new Date(+current));
    current.setDate(current.getDate() + 7);
  }
  return result;  
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
