//this script details what happens when the google sheet needs to "roll-over". I.e. the event has finished and "2 months in the future" has just been offset by a day.
module.exports.Shift = function Shift()
{	
	//first, figure out what day of the week was yesterday 
	//(because it's being run on morning after event days at 4am)
	var eventDay = DayOfTheWeek();

	switch(eventDay) //double check that 1 is monday and sunday is 7, it might be 0
	{
		case 1: //monday
		{
			break;
		}

		case 3: //wednesday
		{
			break;
		}

		case 7: //sunday maybe

		{
			break;
		}

		default: 
		throw "Shouldn't have reached this point. TODO - Proper error checking.";
	}

}

function ReturnEventDays()
{
	//return all the date objects for the next 2 month period
	var EventDays = "";


	return EventDays;
}

function DayOfTheWeek()
{
	var day = new Date();
	var dayNumber = day.getDay();

	if(dayNumber = 1)
	{
		return 7;
	}
	else
	{
		return dayNumber - 1;
	}
}