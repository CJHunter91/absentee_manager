import React, { Component } from 'react';
import DateView from '../components/DateView';
import moment from 'moment';

class Calendar extends Component{

	constructor(props){
		super(props);
		this.state = {
			today: this.getTodaysDate()
		}
	}

	getTodaysDate(){
		const date = moment()
		return date;
	}

	getThisMonth(){

	}

	getNextDate(date){
		const dateString = moment(date).add(1, 'days');
		return(dateString)
	}

	render(){
		return(
			<section>
				<p>{}</p>
				<DateView/>
			</section>
			)
	}
}

export default Calendar;