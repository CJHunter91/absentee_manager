import React, { Component } from 'react';
import DateView from '../components/MonthView';
import UserInput from '../components/UserInput';
import moment from 'moment';
import data from '../db/samplejson.json'

class Agenda extends Component{

	constructor(props){
		super(props);
		this.state = {
			today: this.getTodaysDate(),
			isModalOpen: true
		}

		this.getAbsenteeDates = this.getAbsenteeDates.bind(this);
		this.closeModal = this.closeModal.bind(this);
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

	renderThreeMonths(){
		var currentMonth = moment(this.state.today);
		var monthArray = []
		for (var i = 0; i < 3; i++) {
			monthArray.push(
				<article key={i} className="month">
				<h3>{this.getMonthYearFormat(currentMonth)}</h3>
				<DateView getAbsenteeDates={this.getAbsenteeDates} date={currentMonth}/>
				</article>
				)
			currentMonth = moment(currentMonth).add(1,'M');
		}
		return(monthArray) 
	}

	openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }

	render(){
		return(
			<section id="agenda">
				{this.renderThreeMonths()}
				<UserInput isOpen={this.state.isModalOpen} closeModal={this.closeModal}/>
			</section>
			)
	}
}

export default Agenda;