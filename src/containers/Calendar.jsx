import React, { Component } from 'react';
import DateView from '../components/DateView';
class Calendar extends Component{

	getTodaysDate(){
		const today = new Date()
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		console.log(date)
		return date;
	}

	render(){
		return(
			<DateView/>
			)
	}
}

export default Calendar;