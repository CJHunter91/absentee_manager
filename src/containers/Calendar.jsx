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

	getMonthYearFormat(date){
		return date.format('MMM YYYY')
	}

	getNextDate(date){
		const dateString = moment(date).add(1, 'days');
		return(dateString)
	}

	render(){
		return(
			<section id="calendar">
				<article className="month">
				<h3>{this.getMonthYearFormat(this.state.today)}</h3>
				<DateView date={this.state.today}/>
				</article>
			</section>
			)
	}
}

export default Calendar;