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
		this.getAbsenteeDates = this.getAbsenteeDates.bind(this);
	}

	componentDidMount(){
		// console.log("EXAMPLE SERVER UPDATE REQUEST - for all data");
		this.setState({data: data});
	}
	componentWillMount(){
		this.setState({data:[]})
	}

	getAbsenteeDates(date){
		const filteredDates = this.state.data.filter((absentee) => {
			if(date.month() === moment(absentee.date).month() &&
				date.year() === moment(absentee.date).year()){
				return absentee;
			}
		})

		return this.sortAbsenteeDates(filteredDates);
	}

	sortAbsenteeDates(dates){
		return dates.sort(function(a,b){
			const dateA = moment(a.date)
			const dateB = moment(b.date)
			return dateA.diff(dateB);
		})
	}

	getTodaysDate(){
		const date = moment();
		return date;
	}

	getMonthYearFormat(date){
		return moment(date).format('MMM YYYY');
	}

	getNextDate(date){
		const dateString = moment(date).add(1, 'days');
		return(dateString);
	}

	render(){
		return(
			<section id="calendar">
				<article className="month">
				<h3>{this.getMonthYearFormat(this.state.today)}</h3>
				<DateView getAbsenteeDates={this.getAbsenteeDates} date={this.state.today}/>
				</article>
			</section>
			)
	}
}

export default Calendar;