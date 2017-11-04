import React, { Component } from 'react';
import DateView from '../components/MonthView';
import UserInput from '../components/UserInput';
import moment from 'moment';
import data from '../db/samplejson.json'

class Agenda extends Component{

	constructor(props){
		super(props);
		this.state = {
			currentDate: moment(),
			isModalOpen: true, 
			absenceData: {
				userid: 10,
				name: "Joe Bloggs",
				date:'',
				unit:'ALL',
				value:''
			}
		}
		this.getAbsenteeDates = this.getAbsenteeDates.bind(this);
		this.updateAbscenseData = this.updateAbscenseData.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitAbscenceData = this.submitAbscenceData.bind(this);
	}

	componentDidMount(){
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

	getMonthYearFormat(date){
		return moment(date).format('MMM YYYY');
	}

	updateAbscenseData(e){
		var data = Object.assign({}, this.state.absenceData);
		data[e.target.name] = e.target.value;
		this.setState({absenceData: data});
	}

	submitAbscenceData(e){
		e.preventDefault()
		var data = this.state.data.slice(0);
		data.push(this.state.absenceData);
		this.setState({data: data})
	}

	renderThreeMonths(){
		var currentMonth = moment(this.state.currentDate);
		var monthArray = []
		for (var i = 0; i < 3; i++) {
			monthArray.push(
				<article key={i} className="month">
				<h3>{this.getMonthYearFormat(currentMonth)}</h3>

				<DateView  getAbsenteeDates={this.getAbsenteeDates} 
				date={currentMonth}
				/>

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
				<UserInput isOpen={this.state.isModalOpen} 
				closeModal={this.closeModal}
				data={this.state.absenceData}
				updateAbscenseData={this.updateAbscenseData}
				submitData={this.submitAbscenceData}
				/>
			</section>
			)
	}
}

export default Agenda;