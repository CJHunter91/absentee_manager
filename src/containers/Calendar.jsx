import React, { Component } from 'react';
import DateView from '../components/DateView';
import moment from 'moment';
import data from '../db/samplejson.json'

class Calendar extends Component{

	constructor(props){
		super(props);
		this.state = {
			today: this.getTodaysDate()
		}
	}

	componentDidMount(){
		console.log("EXAMPLE SERVER UPDATE REQUEST - for all data")
		this.setState({data: data})
	}

	getAbsenteeDates(date){
		return this.state.data.filter((absentee) => {
			if(moment(date).month() === moment(absentee.date).month() &&
				moment(date).year() === moment(absentee.date).year()){
				return absentee
			}
		})
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