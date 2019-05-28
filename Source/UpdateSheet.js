//this script details what happens when the google sheet needs to "roll-over". I.e. the event has finished and "2 months in the future" has just been offset by a week on wednesday eve
module.exports.Shift = function Shift()
{	
	//THIS IS RUN ON WEDNESDAY AT 11:30PM

	var Today = new Date();
	var FutureDate = Today.addDays(62) //maximum days of two consecutive months, will trim to 8 weeks later.

	//first get arrays of dates for wednesday-sunday-monday

	var WednesdayDates = getDaysBetweenDates(Today, FutureDate, 'Wed');
	var SundayDates = getDaysBetweenDates(Today, FutureDate, 'Sun');
	var MondayDates = getDaysBetweenDates(Today, FutureDate, 'Mon');

	var combinedLength = WednesdayDates.length + SundayDates.length + MondayDates.length;
	console.log(WednesdayDates.length + " - Length.");
	 
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
	 		//var tempSplit2 = tempSplit.split(' ');
	 		splitDate = [tempSplit[0], tempSplit[1], tempSplit[2]];	 		
	 		dates.push(splitDate);

	 		if(tempSplit[0] == 'Wed')
	 		{
	 			wednesdayCount++;
	 		}

	 		tempSplit = SundayDates[i].toString().split(' ');
	 		//var tempSplit2 = tempSplit.split(' ');
	 		splitDate = [tempSplit[0], tempSplit[1], tempSplit[2]];
	 		dates.push(splitDate);

	 		tempSplit = MondayDates[i].toString().split(' ');
	 		//var tempSplit2 = tempSplit.split(' ');
	 		splitDate = [tempSplit[0], tempSplit[1], tempSplit[2]];
	 		dates.push(splitDate);
	 	}
	 	catch(err)
	 	{
	 		break;
	 	}
	 }
	 console.log(dates);
	
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

