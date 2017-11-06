import React, { Component } from 'react';
import DateView from '../components/MonthView';
import UserInput from '../components/UserInput';
import moment from 'moment';
import data from '../db/samplejson.json'
import pHolidays from '../db/holidaydata.json'

class Agenda extends Component{

	constructor(props){
		super(props);
		this.state = {
			currentDate: moment(),
			isModalOpen: false, 
			absenceData: {
				userid: 1,
				name: "Matthew Webb",
				date:'',
				unit:'',
				value:''
			}
		};
		this.getAbsenteeDates = this.getAbsenteeDates.bind(this);
		this.updateAbscenseData = this.updateAbscenseData.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.updateYear = this.updateYear.bind(this);
		this.updateMonth = this.updateMonth.bind(this);
		this.submitAbsenceData = this.submitAbsenceData.bind(this);
		this.clickAbsenceData = this.clickAbsenceData.bind(this);
	}

	componentDidMount(){
		this.setState({data: data, pHolidays: pHolidays});
	}
	componentWillMount(){
		this.setState({data:[], pHolidays:[]})
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

	clickAbsenceData(params){
		console.log(params)
		if(params.userid === this.state.absenceData.userid)
			{var data = Object.assign({}, this.state.absenceData, params);
				this.setState({absenceData: data}, this.openModal)}
	}

	submitAbsenceData(e){
		e.preventDefault()
		var data = this.state.data.slice(0);
		data.push(this.state.absenceData);
		this.setState({data: data})
	}

	findAbsence(data, absenceData = this.state.absenceData){
		const userAbsence = data.find((absence)=>{
			if(
				absence.userid === absenceData.userid &&
				absence.date === absenceData.date &&
				absence.unit ===absenceData.unit
				){
				return true
			}
			return false
		})
		return userAbsence
	}



	updateYear(e){
		var date = moment(this.state.currentDate);
		var modifier = 1;
		if(e.target.classList[0]  === "prev"){modifier *= -1}
		date.add(modifier,'Y')
		this.setState({currentDate: date})
	}

	updateMonth(e){
		var date = moment(this.state.currentDate);
		var modifier = 3;
		if(e.target.classList[0] === "prev"){modifier *= -1}
		date.add(modifier,'M')
		this.setState({currentDate: date})
	}

	renderThreeMonths(date=this.state.currentDate){
		var monthArray = []
		for (var i = 0; i < 3; i++) {
			monthArray.push(
				<article key={i} className="month">
				<h3>{this.getMonthYearFormat(date)}</h3>

				<DateView absenceClick={this.clickAbsenceData} getAbsenteeDates={this.getAbsenteeDates} 
				date={date}
				userID={this.state.absenceData.userid}
				/>

				</article>
				)
			date = moment(date).add(1,'M');
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
				<button id="prev-year" className="prev button" onClick={this.updateYear}>Prev Year</button>
				<button id="next-year" className="next button" onClick={this.updateYear}>Next Year</button>
				<button id="prev-year" className="prev button" onClick={this.updateMonth}>Prev Months</button>
				{this.renderThreeMonths()}
				<UserInput isOpen={this.state.isModalOpen} 
				closeModal={this.closeModal}
				data={this.state.absenceData}
				updateAbscenseData={this.updateAbscenseData}
				submitData={this.submitAbsenceData}
				/>
				<button id="next-year" className="next button" onClick={this.updateMonth}>Next Months</button>
				<button id="new-absence" className="new button" onClick={this.openModal}>Add Absence</button>
			</section>
			)
	}
}

export default Agenda;