import React, { Component } from 'react';
import DateView from '../components/DateView';
class Calendar extends Component{

	getTodaysDate(){
		const today = new Date()
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		console.log(date)
		return date;
	}

	getNextDate(date){
		const nextDate = new Date(Date.parse(date));
		nextDate.setDate(nextDate.getDate() + 1);
		const dateString = nextDate.getFullYear()+'-'+(nextDate.getMonth()+1)+'-'+nextDate.getDate();
		return(dateString)
	}

	render(){
		return(
			<DateView/>
			)
	}
}

export default Calendar;