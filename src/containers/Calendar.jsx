import React, { Component } from 'react';
import DateView from '../components/DateView';
import moment from 'moment';
class Calendar extends Component{

	getTodaysDate(){
		const date = moment().format('YYYY[-]MM[-]D')
		return date;
	}

	getNextDate(date){
		const dateString = moment(date).add(1, 'days');
		return(dateString.format('YYYY[-]MM[-]D'))
	}

	render(){
		return(
			<section>
				<p>{this.getNextDate()}</p>
				<DateView/>
			</section>
			)
	}
}

export default Calendar;