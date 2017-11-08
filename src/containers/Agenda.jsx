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
				unit:'AM',
				value:''
			},
			clash:""
		};
		this.holidaysAndAbsentees = this.holidaysAndAbsentees.bind(this);
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

	getPublicHolidays(date){
		var filterPublicHolidays = this.state.pHolidays.filter((holiday) =>{
			var holidayDate = date.year() + "-" + holiday.date;
			if(date.month() === moment(holidayDate).month()){
				return holiday
			}
		})
		var newArray = [];
		filterPublicHolidays.forEach((holiday)=>{
			var holidayCopy = Object.assign({},holiday);
			holidayCopy.date = date.year() + "-" + holiday.date;
			newArray.push(holidayCopy)
		})
		return newArray;
	}

	getAbsenteeDates(date){
		//accesses db
		const filteredDates = this.state.data.filter((absentee) => {
			if(date.month() === moment(absentee.date).month() &&
				date.year() === moment(absentee.date).year() &&
				absentee.value !== "P"){
				return absentee;
		}
	})
		
		
		return filteredDates
	}

	holidaysAndAbsentees(date){
		return this.sortAbsenteeDates(this.getAbsenteeDates(date).concat(this.getPublicHolidays(date)))
	}

	sortAbsenteeDates(dates){
		return dates.sort(function(a,b){
			const dateA = moment(a.date)
			const dateB = moment(b.date)
			return dateA.diff(dateB);
		})
	}

	updateClash(message = ""){
		this.setState({clash: message})
	}

	findOverlap(absenceData, absences){
		var userAbsence = absences.find((absence, index)=>{
			if(
				absence.userid !== absenceData.userid &&
				absence.date === absenceData.date &&
				absence.unit === absenceData.unit
				){
				
				return true
		}

		return false
	})	
		
		if(userAbsence){
			this.updateClash("Warning this date overlaps with another absence") 
		}
		else{
			this.updateClash("Warning this date is adjacent with another absence")
		}
	}

	getCloseDates(absenceData, number=5){
		const currentDate = moment(absenceData.date)
		const prevDays = moment(currentDate).add(number * -1,'days')
		const nextDays = moment(currentDate).add(number,'days')

		var userAbsences = this.state.data.filter((absence, index)=>{
			if(absence.userid !== absenceData.userid &&
				moment(absence.date).isBetween(prevDays, nextDays)
					){
					return true
				}
				return false
			})

	if(userAbsences.length > 0 && number !==2){
		this.getCloseDates(absenceData, 2)
	}
	else if(number === 2 && userAbsences.length > 0 ){
		this.findOverlap(absenceData, userAbsences)
		
	}
	else if(number === 2){
		this.updateClash("Warning this date is within 4 days of another absence")
	}
	else(
		this.updateClash("")
		)

}

getMonthYearFormat(date){
	return moment(date).format('MMMM YYYY');
}

sortTitles(array){
	var newArray = [];
	for (var i = array.length - 1; i >= 0; i--) {
		if(array[i].title){
			newArray.push(array[i])
			array.splice(i,1)
		}
	}
	return newArray.concat(array)
}

updateAbscenseData(e){
	var absenceData = Object.assign({}, this.state.absenceData);
	absenceData[e.target.name] = e.target.value;
	this.setState({absenceData: absenceData}, ()=>{
		this.getCloseDates(absenceData)
	});
}

clickAbsenceData(params){
	if(params.userid === this.state.absenceData.userid)
		{var data = Object.assign({}, this.state.absenceData, params);
	this.setState({absenceData: data}, this.openModal)}
}

submitAbsenceData(e){
		//db access
		e.preventDefault()
		var data = this.state.data.slice(0);
		data.splice(this.findAbsenceIndex(data),1);
		data.push(this.state.absenceData);
		this.setState({data: data})
		this.closeModal();
	}

	removeAbsenceData(data){
		data.splice(this.findAbsenceIndex(data),1);
	}

	findAbsenceIndex(data, absenceData = this.state.absenceData){
		var absenceIndex = false;
		var userAbsence = data.find((absence, index)=>{
			if(
				absence.userid === absenceData.userid &&
				absence.date === absenceData.date &&
				absence.unit ===absenceData.unit
				){
				absenceIndex = index;
			return true
		}
		return false
	})
		return absenceIndex
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
				<section key={i} className="month">
				<h3>{this.getMonthYearFormat(date)}</h3>
				<article className="month-days">
				<DateView absenceClick={this.clickAbsenceData} 
				getAbsenteeDates={this.holidaysAndAbsentees} 
				date={date}
				userID={this.state.absenceData.userid}
				/>
				</article>
				</section>
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
			<nav id="fixed-nav">
			<button id="prev-month" className="prev button" onClick={this.updateMonth}>Prev Months</button>
			<button id="prev-year" className="prev button" onClick={this.updateYear}>Prev Year</button>
			<button id="next-year" className="next button" onClick={this.updateYear}>Next Year</button>
			<button id="next-month" className="next button" onClick={this.updateMonth}>Next Months</button>
			</nav>
			{this.renderThreeMonths()}
			<UserInput isOpen={this.state.isModalOpen} 
			closeModal={this.closeModal}
			data={this.state.absenceData}
			updateAbscenseData={this.updateAbscenseData}
			submitData={this.submitAbsenceData}
			clash={this.state.clash}
			/>
			<nav id="fixed-absence">
			<button id="new-absence" className="new button" onClick={this.openModal}>Add Absence</button>
			</nav>
			</section>
			)
	}
}

export default Agenda;